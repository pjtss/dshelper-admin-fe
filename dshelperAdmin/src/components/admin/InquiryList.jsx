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
      .then(res => {
        console.log(res.data);
        setInquiries(res.data.inquiries); // ← 수정됨!
      })
      .catch(err => console.error(err));
  }, []);

  const handleCancel = (id) => {
    setInquiries(prev => prev.filter(item => item.inquiryId !== id));
  };

  const handleReply = (id) => {
    setInquiries(prev => prev.filter(item => item.inquiryId !== id));
  };

  return (
    <div>
      <h1>문의 목록</h1>
      {inquiries.length === 0 ? (
        <p>답변이 필요한 문의가 없습니다.</p>
      ) : (
        inquiries.map(inquiry => (
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
