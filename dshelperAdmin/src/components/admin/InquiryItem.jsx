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
    <div className="page-card p-4">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3">
        <div>
          <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
            <span className="badge rounded-pill text-bg-primary">{inquiry.type}</span>
            <span className="fw-bold">{inquiry.user.name}</span>
          </div>
          <p className="mb-2 text-secondary">{inquiry.content}</p>
          <div className="small text-secondary">작성일 {inquiry.createdAt}</div>
        </div>
        <button
          type="button"
          className={`btn ${open ? "btn-primary" : "btn-outline-primary"} rounded-pill px-4`}
          onClick={() => setOpen(!open)}
        >
          {open ? "닫기" : "답변"}
        </button>
      </div>

      {inquiry.imageUrls.length > 0 && (
        <div className="mt-4">
          <div className="fw-semibold mb-2">첨부 이미지</div>
          <div className="d-flex flex-wrap gap-3">
            {inquiry.imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt="문의 첨부 이미지"
                className="inquiry-image"
              />
            ))}
          </div>
        </div>
      )}

      {open && (
        <div className="mt-4 border-top pt-4">
          <label className="form-label fw-semibold">답변 내용</label>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="답변 내용을 입력하세요"
            rows="4"
            className="form-control rounded-4"
            style={{ resize: "none" }}
          />

          <div className="d-flex flex-wrap gap-2 mt-3">
            <button type="button" onClick={submitReply} className="btn btn-primary rounded-pill px-4">
              답변 등록
            </button>
            <button type="button" onClick={cancelInquiry} className="btn btn-outline-danger rounded-pill px-4">
              문의 취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InquiryItem;
