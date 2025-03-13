import { useEffect, useState } from "react";
import PostCard from "../../components/common/PostCard";
import ProfileHeader from "../../components/common/ProfileHeader";
import ScrollToTopButton from "../../components/ui/ScrollToTopButton";
import { TitleBar } from "../../components/ui/TitleBar";
import { PostCardProps } from "../../types/Post";
import api from "../../api/api";
import { UserData } from "../../types/user";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const [postData, setPostData] = useState<PostCardProps["post"][]>([]);
  const [userData, setUserData] = useState<UserData>();
  const { userId } = useParams<{ userId: string }>();
  const getUserData = async () => {
    try {
      const response = await api.get(`/api/user/${userId}/profile`);
      setUserData(response.data.data);
    } catch (error) {
      console.error(`데이터를 불러오는 중 오류 발생:`, error);
      return [];
    }
  };

  const getPostsData = async () => {
    try {
      const response = await api.get(
        `/api/users/${userId}/socialPosts?pageNum=0&pageSize=100`
      );
      setPostData(response.data.data.posts);
    } catch (error) {
      console.error(`데이터 불러오기 실패:`, error);
    }
  };
  useEffect(() => {
    getUserData();
    getPostsData();
  }, []);

  return (
    <div className="w-full flex flex-col mx-auto ">
      <div className="mt-[108px] max-w-[1280px] mx-auto p-6 mb-20">
        {userData && (
          <ProfileHeader
            nickname={userData.nickname}
            description={userData.description}
            interests={userData.interests}
            profileImage={userData.s3Bucket}
          />
        )}
        <TitleBar
          title={`${(userData && userData.nickname) || "유저"}의 포스트`}
        />
        <div className="grid grid-cols-3 gap-10 mt-15">
          {postData && postData.length > 0 ? (
            postData.map((post, index) => (
              <PostCard key={index} post={post} onLikeToggle={async () => {}} />
            ))
          ) : (
            <div className="col-span-3 flex justify-center items-center h-[200px]">
              <p className="text-gray-40">작성된 포스트가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default UserPage;
