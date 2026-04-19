import React, { useEffect, useState } from "react";
import axios from "axios";
import InquiryItem from "./InquiryItem";

axios.defaults.baseURL = "https://server.dshelper.kr";
axios.defaults.withCredentials = true;

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    axios
      .get("/admin/inquires/un-replied")
      .then((res) => {
        console.log(res.data);
        setInquiries(res.data.inquiries);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCancel = (id) => {
    setInquiries((prev) => prev.filter((item) => item.inquiryId !== id));
  };

  const handleReply = (id) => {
    setInquiries((prev) => prev.filter((item) => item.inquiryId !== id));
  };

  return (
    <section className="inquiry-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Inquiry Inbox</p>
          <h1 className="section-title">臾몄쓽 紐⑸줉</h1>
        </div>
      </div>

      <div className="inquiry-list">
        {inquiries.length === 0 ? (
          <div className="surface-card empty-state">
            <p>?듬????꾩슂??臾몄쓽媛 ?놁뒿?덈떎.</p>
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <InquiryItem
              key={inquiry.inquiryId}
              inquiry={inquiry}
              onCancel={handleCancel}
              onReply={handleReply}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default InquiryList;
