import React, { useEffect, useState } from "react";
import BaseApi from "@/api/BaseApi.jsx";
import InquiryItem from "./InquiryItem";

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    BaseApi.get("/admin/inquires/un-replied")
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
    <div>
      <h1>문의 목록</h1>
      {inquiries.length === 0 ? (
        <p>응답이 필요한 문의가 없습니다.</p>
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
  );
}

export default InquiryList;
