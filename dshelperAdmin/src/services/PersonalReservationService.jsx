import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://server.dshelper.kr";
axios.defaults.withCredentials = true;

function AdminReservations() {
  const [personalReservations, setPersonalReservations] = useState([]);
  const [organizationReservations, setOrganizationReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const res = await axios.get("/admin/reservations/requested-reservations", {
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
      console.error("Failed to load reservations", e);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handlePersonalReservationStatusChange = async (personalReservationId, status) => {
    try {
      await axios.patch("/admin/personal-reservation/status", {
        personalReservationId,
        status,
      });

      alert(`Personal reservation status changed to '${status}'.`);
      fetchReservations();
    } catch (e) {
      console.error("Failed to update personal reservation status", e);
      alert("Status update failed.");
    }
  };

  const handleOrganizationReservationStatusChange = async (organizationReservationId, status) => {
    try {
      await axios.patch("/admin/organization-reservation/status", {
        organizationReservationId,
        status,
      });

      alert(`Organization reservation status changed to '${status}'.`);
      fetchReservations();
    } catch (e) {
      console.error("Failed to update organization reservation status", e);
      alert("Status update failed.");
    }
  };

  const renderActions = (onApprove, onCancel) => (
    <div className="table-actions">
      <button type="button" className="table-action-button primary" onClick={onApprove}>
        Approve
      </button>
      <button type="button" className="table-action-button secondary" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );

  return (
    <section className="reservation-page">
      <div className="section-heading reservation-heading">
        <div>
          <p className="eyebrow">Reservations</p>
          <h1 className="section-title">Reservation Management</h1>
        </div>
      </div>

      <div className="surface-card table-card">
        <div className="table-card-header">
          <h2>Personal Requests</h2>
          <span>{personalReservations.length} items</span>
        </div>
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Holder</th>
                <th>Phone</th>
                <th>Visit Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Requirement</th>
                <th>Note</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {personalReservations.map((item) => (
                <tr key={item.personalReservationId}>
                  <td>{item.reservationHolder}</td>
                  <td>{item.reservationPhoneNumber}</td>
                  <td>{item.visitDate}</td>
                  <td>{item.startTime} ~ {item.endTime}</td>
                  <td><span className="status-pill">{item.reservationStatus}</span></td>
                  <td>{item.requirement}</td>
                  <td>{item.note}</td>
                  <td>
                    {renderActions(
                      () => handlePersonalReservationStatusChange(item.personalReservationId, "?꾨즺"),
                      () => handlePersonalReservationStatusChange(item.personalReservationId, "痍⑥냼"),
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="surface-card table-card">
        <div className="table-card-header">
          <h2>Organization Requests</h2>
          <span>{organizationReservations.length} items</span>
        </div>
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Organization</th>
                <th>Holder</th>
                <th>Phone</th>
                <th>Visit Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Requirement</th>
                <th>Action</th>
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
                  <td><span className="status-pill">{item.reservationStatus}</span></td>
                  <td>{item.requirement}</td>
                  <td>
                    {renderActions(
                      () => handleOrganizationReservationStatusChange(item.organizationReservationId, "?꾨즺"),
                      () => handleOrganizationReservationStatusChange(item.organizationReservationId, "痍⑥냼"),
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default AdminReservations;
