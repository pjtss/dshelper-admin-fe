import {join, login, kakaoLogin, naverLogin, logout} from '@/services/UserService.jsx';
import InquiryList from '@/components/admin/InquiryList.jsx';
import AdminReservations from '@/services/PersonalReservationService';

export default function dshelper() {

    return (
        <div>
            <h1> DS Helper </h1>
            <button onClick={join} > 회원가입 </button>
            <button onClick={login} > 로그인 </button>
            <button onClick={kakaoLogin} > 카카오로그인 </button>
            <button onClick={naverLogin} > 네이버로그인 </button>
            <button onClick={logout} > 로그아웃 </button>
            <button onClick={InquiryList} > 관리자 문의 관리 페이지 </button>
            <button onClick={AdminReservations} > 관리자 예약 관리 페이지 </button>
        </div>
    );
}
