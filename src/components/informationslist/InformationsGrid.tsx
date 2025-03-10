import { FC } from "react";
import InformationCard from "../../components/common/InformationCard";
import { EventData } from "../../hooks/useInformationsList";

interface EventsGridProps {
  events: EventData[];
  loading: boolean;
  onBookmarkChange?: (id: number, newStatus: boolean) => void;
}

const InformationsGrid: FC<EventsGridProps> = ({
  events,
  loading,
  onBookmarkChange,
}) => {
  // 첫 번째 이미지 URL 추출 함수
  const getFirstImageUrl = (urls: string | null): string => {
    if (!urls) return "/default-image.png";

    // 대괄호로 둘러싸인 배열 형태 확인
    if (urls.startsWith("[") && urls.endsWith("]")) {
      try {
        // 배열 파싱 시도
        const urlArray = JSON.parse(urls);
        return urlArray[0] || "/default-image.png";
      } catch {
        // 파싱 실패 시 단순 분리
        const firstUrl = urls.substring(
          1,
          urls.indexOf(",") > 0 ? urls.indexOf(",") : urls.length - 1
        );
        return firstUrl.replace(/"/g, "") || "/default-image.png";
      }
    }

    // 콤마로 구분된 URL 목록
    if (urls.includes(",")) {
      return urls.split(",")[0].trim();
    }

    return urls;
  };

  // 북마크 변경 핸들러
  const handleBookmarkChange = (id: number, newStatus: boolean) => {
    if (onBookmarkChange) {
      onBookmarkChange(id, newStatus);
    }
  };

  // 현재 카테고리 파악
  const getCurrentCategory = (): string => {
    const pathname = window.location.pathname;
    const match = pathname.match(/\/informations\/([^\/]+)/);
    return match ? match[1] : "";
  };

  const currentCategory = getCurrentCategory();

  if (loading) {
    return (
      <div className="w-full mt-16 grid grid-cols-3 gap-6 min-h-[600px] place-items-center">
        <p>불러오는 중...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="w-full mt-16 min-h-[600px] flex justify-center items-center">
        <p>표시할 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-16 grid grid-cols-3 gap-6">
      {events.map((event) => (
        <InformationCard
          key={event.id}
          id={event.id}
          imageUrl={getFirstImageUrl(event.postUrl)}
          title={event.title || "제목 없음"}
          startDate={event.startDate || undefined}
          endDate={event.endDate || undefined}
          location={event.location || "위치 정보 없음"}
          isBookmarked={!!event.bookmarked}
          onBookmarkChange={handleBookmarkChange}
          category={currentCategory}
        />
      ))}
    </div>
  );
};

export default InformationsGrid;
