import React, { useEffect, useState } from "react";
import BaseApi from "@/api/BaseApi.jsx";
import InquiryItem from "./InquiryItem";

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BaseApi.get("/admin/inquires/un-replied")
      .then((res) => {
        setInquiries(res.data.inquiries);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = (id) => {
    setInquiries((prev) => prev.filter((item) => item.inquiryId !== id));
  };

  const handleReply = (id) => {
    setInquiries((prev) => prev.filter((item) => item.inquiryId !== id));
  };

  return (
    <section className="d-flex flex-column gap-4">
      <div className="page-card p-4">
        <div className="text-uppercase small fw-bold text-primary mb-2">Inquiry</div>
        <h2 className="page-section-title mb-1">문의 관리</h2>
        <p className="page-section-subtitle mb-0">답변이 필요한 문의를 확인하고 바로 처리합니다.</p>
      </div>

      {loading ? (
        <div className="page-card p-5 text-center">
          <div className="spinner-border text-primary mb-3" role="status" />
          <div className="text-secondary">문의 목록을 불러오는 중입니다.</div>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="page-card p-5 text-center">
          <h3 className="h5 fw-bold mb-2">처리할 문의가 없습니다.</h3>
          <p className="text-secondary mb-0">현재 응답 대기 중인 문의가 없습니다.</p>
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
    </section>
  );
}

export default InquiryList;
