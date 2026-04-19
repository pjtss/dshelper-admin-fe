import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://server.dshelper.kr"
axios.defaults.withCredentials = true;

function AdminReservations() {
  const [personalReservations, setPersonalReservations] = useState([]);
  const [organizationReservations, setOrganizationReservations] = useState([]);

  // 1. 데이터 Fetch
  const fetchReservations = async () => {
    try {
      const res = await axios.get("/admin/reservations/requested-reservations", {
        params: {
          page: 0,
          size: 20,
          sort: "desc",
          sortBy: "createdAt",
        }
      });

      setPersonalReservations(res.data.personalReservations.content);
      setOrganizationReservations(res.data.organizationReservations.content);
    } catch (e) {
      console.error("예약 데이터 조회 실패", e);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // 2. 완료 / 취소 처리
  const handlePersonalReservationStatusChange = async (personalReservationId, status) => {
    try {
      await axios.patch("/admin/personal-reservation/status", {
        personalReservationId,
        status   // "완료" 또는 "취소"
      });

      alert(`개인 예약의 상태가 '${status}'로 변경되었습니다.`);
      fetchReservations();
    } catch (e) {
      console.error("상태 변경 실패", e);
      alert("상태 변경에 실패했습니다.");
    }
  };

   // 2. 완료 / 취소 처리
  const handleOrganizationReservationStatusChange = async (organizationReservationId, status) => {
    try {
      await axios.patch("/admin/organization-reservation/status", {
        organizationReservationId,
        status   // "완료" 또는 "취소"
      });

      alert(`기관 예약의 상태가 '${status}'로 변경되었습니다.`);
      fetchReservations();
    } catch (e) {
      console.error("상태 변경 실패", e);
      alert("상태 변경에 실패했습니다.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>개인 예약 요청</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", marginBottom: "30px" }}>
        <thead>
          <tr>
            <th>예약자</th>
            <th>전화번호</th>
            <th>방문일</th>
            <th>시간</th>
            <th>상태</th>
            <th>도움 요청 내용</th>
            <th>특이사항</th>
          </tr>
        </thead>
        <tbody>
          {personalReservations.map((item) => (
            <tr key={item.personalReservationId}>
              <td>{item.reservationHolder}</td>
              <td>{item.reservationPhoneNumber}</td>
              <td>{item.visitDate}</td>
              <td>{item.startTime} ~ {item.endTime}</td>
              <td>{item.reservationStatus}</td>
              <td>{item.requirement}</td>
              <td>{item.note}</td>
              <td>
                <button onClick={() => handlePersonalReservationStatusChange(item.personalReservationId, "완료")}>
                  완료
                </button>
                <button 
                  onClick={() => handlePersonalReservationStatusChange(item.personalReservationId, "취소")}
                  style={{ marginLeft: "8px" }}
                >
                  취소
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>기관 예약 요청</h2>
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>기관명</th>
            <th>예약자</th>
            <th>전화번호</th>
            <th>방문일</th>
            <th>시간</th>
            <th>상태</th>
            <th>도움 요청 내용</th>
          </tr>
        </thead>
        <tbody>
          {organizationReservations.map((item) => (
            <tr key={item.organizationReservationId}>
              <td>{item.organizationName}</td>
              <td>{item.reservationHolder}</td>
              <td>{item.reservationPhoneNumber}</td>
              <td>{item.visitDate}</td>
              <td>{item.startTime} ~ {item.endTime}</td>
              <td>{item.reservationStatus}</td>
              <td>{item.requirement}</td>
              <td>
                <button onClick={() => handleOrganizationReservationStatusChange(item.organizationReservationId, "완료")}>
                  완료
                </button>
                <button
                  onClick={() => handleOrganizationReservationStatusChange(item.organizationReservationId, "취소")}
                  style={{ marginLeft: "8px" }}
                >
                  취소
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default AdminReservations;
