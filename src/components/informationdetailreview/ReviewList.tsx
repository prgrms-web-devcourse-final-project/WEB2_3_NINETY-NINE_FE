import { useState } from "react";
import Icon from "../../assets/icons/Icon";
import Pagination from "../../components/ui/Pagination";
import StarDisplay from "../../components/informationdetailreview/StarDisplay";
import ReviewListImagePopUp from "./ReviewListImagePopUp";
import { Review } from "../../types/Review";
import { useAuthStore } from "../../stores/authStore";

interface ReviewListProps {
  reviews: Review[];
  totalItems: number;
  currentUserId: string;
  onDeleteReview?: (reviewId: number) => void;
}

const ReviewList = ({
  reviews,
  totalItems,
  onDeleteReview,
}: ReviewListProps) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [popupImage, setPopupImage] = useState<string | null>(null);
  const { user } = useAuthStore(); // 현재 로그인한 사용자 정보 가져오기

  const currentReviews = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleImageClick = (image?: string) => {
    if (image) {
      setPopupImage(image);
    }
  };

  const handleClosePopup = () => {
    setPopupImage(null);
  };

  const isReviewAuthor = (review: Review) => {
    return review.isMyReview || (user && user.id === parseInt(review.userId));
  };

  const handleDeleteClick = (reviewId: number) => {
    if (onDeleteReview) {
      onDeleteReview(reviewId);
    }
  };

  return (
    <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-5 mt-12">
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
        <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-2 ml-10">
          <p className="flex-grow-0 flex-shrink-0 h4-b font-bold text-left text-gray-80">
            후기{" "}
          </p>
          <p className="flex-grow-0 flex-shrink-0 h4-b font-bold text-left text-gray-80">
            {reviews.length}
          </p>
        </div>
        <div className="w-full border-t border-blue-7 mt-4"></div>
      </div>
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-[30px]">
        {reviews.length === 0 ? (
          <div className="w-full py-16 flex justify-center items-center">
            <p className="body-normal-r text-gray-40">작성된 후기가 없습니다</p>
          </div>
        ) : (
          currentReviews.map((review) => (
            <div
              key={review.id}
              className={`flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 ${review.image ? "h-[200px]" : "h-[142px]"} gap-2.5 pl-[38px] pr-[18px] py-7 rounded-[10px] bg-base-1 border border-blue-7`}
            >
              <div className="flex justify-between items-start flex-grow-0 flex-shrink-0 w-full relative">
                <div className="flex flex-col justify-start items-start flex-grow w-full gap-5">
                  <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                    <p className="flex-grow-0 flex-shrink-0 body-normal-r text-center text-gray-80 cursor-pointer">
                      {review.username}
                    </p>
                    <p className="flex-grow-0 flex-shrink-0 body-normal-r text-center text-gray-80">
                      |
                    </p>
                    <p className="flex-grow-0 flex-shrink-0 body-normal-r text-center text-gray-80">
                      {review.date}
                    </p>
                    <p className="flex-grow-0 flex-shrink-0 body-normal-r text-center text-gray-80">
                      |
                    </p>
                    <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-0.5">
                      <StarDisplay rating={review.rating} />
                    </div>
                  </div>
                  <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-[38px]">
                    {review.image && (
                      <div
                        className="w-[100px] h-[100px] relative rounded-lg cursor-pointer"
                        style={{
                          backgroundImage: `url(${review.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        onClick={() => handleImageClick(review.image)}
                      >
                        <div className="absolute top-[84px] left-[84px] w-[12px] h-[12px] rounded-full bg-base-1 flex items-center justify-center">
                          <Icon name="ZoomIn" className="w-[8px] h-[8px]" />
                        </div>
                      </div>
                    )}
                    <p
                      className={`flex-grow-0 flex-shrink-0 ${review.image ? "w-[906px]" : "w-[1044px]"} body-small-r text-left text-gray-80`}
                    >
                      {review.content}
                    </p>
                  </div>
                </div>
                {isReviewAuthor(review) && (
                  <div className="flex-shrink-0">
                    <Icon
                      name="Trash2"
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => handleDeleteClick(review.id)}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {reviews.length > 0 && (
        <div className="w-full flex justify-center my-12">
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
      {popupImage && (
        <ReviewListImagePopUp
          imageUrl={popupImage}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default ReviewList;
