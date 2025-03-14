import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Community from "../pages/community/Community";
import CommunityDetail from "../pages/community/communityDetail/CommunityDetail";
import CommunityEditor from "../pages/community/CommunityEditor";
import Informations from "../pages/informations/Informations";
import MapSearch from "../pages/mapsearch/MapSearch";
import RootLayout from "../layouts/RootLayout";
import InfoCardDetail from "../pages/informations/InfoCardDetail";
import MyPage from "../pages/user/MyPage";
import UserPage from "../pages/user/UserPage";
import OAuthCallback from "../pages/auth/OAuthCallback";
import ProfileEdit from "../pages/user/ProfileEdit";
import CommunityEditPost from "../pages/community/CommunityEditPost";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";
// import PrivateRoute from "./PrivateRoute";

const Router = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/signup" element={<Signup />} />

        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/community" element={<Community />} />
        <Route path="/community/:postId" element={<CommunityDetail />} />
        <Route path="/community/editor" element={<CommunityEditor />} />
        <Route
          path="/community/editor/:postId"
          element={<CommunityEditPost />}
        />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/edit" element={<ProfileEdit />} />
        <Route path="/userpage/:userId" element={<UserPage />} />
        {/* </Route> */}
        <Route path="/mapsearch" element={<MapSearch />} />
        <Route path="/informations/:category" element={<Informations />} />
        <Route
          path="/informations/:category/:eventId"
          element={<InfoCardDetail />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
