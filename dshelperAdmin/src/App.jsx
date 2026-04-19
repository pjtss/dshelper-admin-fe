// App.jsx
import Dshelper from "@/components/Dshelper";
import InquiryList from "@/components/admin/InquiryList";
import AdminReservations from "@/services/PersonalReservationService.jsx";
import PostCreatePage from "@/pages/PostCreatePage.jsx";
import KakaoCallbackPage from "@/pages/KakaoCallbackPage.jsx";
import AdminLayout from "@/layout/AdminLayout.jsx";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminLayout>
            <Dshelper />
          </AdminLayout>
        }
      />

      <Route path="/oauth/kakao/callback" element={<KakaoCallbackPage />} />

      <Route
        path="/admin/inquiry"
        element={
          <AdminLayout>
            <InquiryList />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/reservations"
        element={
          <AdminLayout>
            <AdminReservations />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/create-post"
        element={
          <AdminLayout>
            <PostCreatePage />
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default App;
