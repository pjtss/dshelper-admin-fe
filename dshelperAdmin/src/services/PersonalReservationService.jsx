import { useEffect, useState } from "react";
import BaseApi from "@/api/BaseApi.jsx";

function AdminReservations() {
  const [personalReservations, setPersonalReservations] = useState([]);
  const [organizationReservations, setOrganizationReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const res = await BaseApi.get("/admin/reservations/requested-reservations", {
        params: {
          page: 0,
          size: 20,
          sort: "desc",
          sortBy: "createdAt",
        },
      });

      setPersonalReservations(res.data.personalReservations.content);
      setOrganizationReservations(res.data.organizationReservations.content);
    } catch (e) {
      console.error("예약 데이터 조회 실패", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handlePersonalReservationStatusChange = async (personalReservationId, status) => {
    try {
      await BaseApi.patch("/admin/personal-reservation/status", {
        personalReservationId,
        status,
      });

      alert(`개인 예약 상태가 '${status}'로 변경되었습니다.`);
      fetchReservations();
    } catch (e) {
      console.error("상태 변경 실패", e);
      alert("상태 변경에 실패했습니다.");
    }
  };

  const handleOrganizationReservationStatusChange = async (organizationReservationId, status) => {
    try {
      await BaseApi.patch("/admin/organization-reservation/status", {
        organizationReservationId,
        status,
      });

      alert(`기관 예약 상태가 '${status}'로 변경되었습니다.`);
      fetchReservations();
    } catch (e) {
      console.error("상태 변경 실패", e);
      alert("상태 변경에 실패했습니다.");
    }
  };

  return (
    <section className="d-flex flex-column gap-4">
      <div className="page-card p-4">
        <div className="text-uppercase small fw-bold text-primary mb-2">Reservation</div>
        <h2 className="page-section-title mb-1">예약 관리</h2>
        <p className="page-section-subtitle mb-0">개인 예약과 기관 예약 요청을 확인하고 상태를 변경합니다.</p>
      </div>

      {loading ? (
        <div className="page-card p-5 text-center">
          <div className="spinner-border text-primary mb-3" role="status" />
          <div className="text-secondary">예약 목록을 불러오는 중입니다.</div>
        </div>
      ) : null}

      <div className="page-card table-card overflow-hidden">
        <div className="p-4 border-bottom">
          <h3 className="h5 fw-bold mb-1">개인 예약 요청</h3>
          <p className="text-secondary mb-0">개인 방문 예약 내역입니다.</p>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>예약자</th>
                <th>전화번호</th>
                <th>방문일</th>
                <th>시간</th>
                <th>상태</th>
                <th>요청 내용</th>
                <th>특이사항</th>
                <th>처리</th>
              </tr>
            </thead>
            <tbody>
              {personalReservations.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-secondary">개인 예약 요청이 없습니다.</td>
                </tr>
              ) : (
                personalReservations.map((item) => (
                  <tr key={item.personalReservationId}>
                    <td>{item.reservationHolder}</td>
                    <td>{item.reservationPhoneNumber}</td>
                    <td>{item.visitDate}</td>
                    <td>{item.startTime} ~ {item.endTime}</td>
                    <td><span className="badge text-bg-light border">{item.reservationStatus}</span></td>
                    <td>{item.requirement || "-"}</td>
                    <td>{item.note || "-"}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handlePersonalReservationStatusChange(item.personalReservationId, "완료")}
                          className="btn btn-sm btn-primary rounded-pill"
                        >
                          완료
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePersonalReservationStatusChange(item.personalReservationId, "취소")}
                          className="btn btn-sm btn-outline-danger rounded-pill"
                        >
                          취소
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="page-card table-card overflow-hidden">
        <div className="p-4 border-bottom">
          <h3 className="h5 fw-bold mb-1">기관 예약 요청</h3>
          <p className="text-secondary mb-0">기관 단위 방문 예약 내역입니다.</p>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>기관명</th>
                <th>예약자</th>
                <th>전화번호</th>
                <th>방문일</th>
                <th>시간</th>
                <th>상태</th>
                <th>요청 내용</th>
                <th>처리</th>
              </tr>
            </thead>
            <tbody>
              {organizationReservations.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-secondary">기관 예약 요청이 없습니다.</td>
                </tr>
              ) : (
                organizationReservations.map((item) => (
                  <tr key={item.organizationReservationId}>
                    <td>{item.organizationName}</td>
                    <td>{item.reservationHolder}</td>
                    <td>{item.reservationPhoneNumber}</td>
                    <td>{item.visitDate}</td>
                    <td>{item.startTime} ~ {item.endTime}</td>
                    <td><span className="badge text-bg-light border">{item.reservationStatus}</span></td>
                    <td>{item.requirement || "-"}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleOrganizationReservationStatusChange(item.organizationReservationId, "완료")}
                          className="btn btn-sm btn-primary rounded-pill"
                        >
                          완료
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOrganizationReservationStatusChange(item.organizationReservationId, "취소")}
                          className="btn btn-sm btn-outline-danger rounded-pill"
                        >
                          취소
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default AdminReservations;
