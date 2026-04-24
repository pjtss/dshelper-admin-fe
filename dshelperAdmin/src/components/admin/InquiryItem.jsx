import React, { useState } from "react";
import BaseApi from "@/api/BaseApi.jsx";

function InquiryItem({ inquiry, onCancel, onReply }) {
  const [replyContent, setReplyContent] = useState("");
  const [open, setOpen] = useState(false);

  const cancelInquiry = () => {
    BaseApi.patch(`/api/inquiries/${inquiry.inquiryId}/cancel`)
      .then(() => onCancel(inquiry.inquiryId))
      .catch((err) => console.error(err));
  };

  const submitReply = () => {
    if (!replyContent.trim()) {
      alert("답변 내용을 입력해 주세요.");
      return;
    }

    BaseApi.post("/replies", {
      inquiryId: inquiry.inquiryId,
      content: replyContent,
    })
      .then(() => {
        alert("답변이 등록되었습니다.");
        setReplyContent("");
        setOpen(false);
        onReply(inquiry.inquiryId);
      })
      .catch((err) => {
        console.error(err);
        alert("답변 등록 중 오류가 발생했습니다.");
      });
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
      <h3
        style={{ cursor: "pointer", color: open ? "#007bff" : "black" }}
        onClick={() => setOpen(!open)}
      >
        {inquiry.type} - {inquiry.user.name}
      </h3>

      <p>{inquiry.content}</p>
      <p><small>작성일 {inquiry.createdAt}</small></p>

      {inquiry.imageUrls.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <b>이미지:</b>
          <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
            {inquiry.imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt="inquiry"
                style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "6px" }}
              />
            ))}
          </div>
        </div>
      )}

      {open && (
        <div style={{ marginTop: "10px" }}>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="답변 내용을 입력하세요"
            rows="3"
            style={{ width: "100%", resize: "none" }}
          />

          <div style={{ marginTop: "5px" }}>
            <button onClick={submitReply}>답변하기</button>
            <button onClick={cancelInquiry} style={{ marginLeft: "10px" }}>
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InquiryItem;
