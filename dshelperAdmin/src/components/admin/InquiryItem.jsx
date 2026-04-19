import React, { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://server.dshelper.kr";
axios.defaults.withCredentials = true;

function InquiryItem({ inquiry, onCancel, onReply }) {
  const [replyContent, setReplyContent] = useState("");
  const [open, setOpen] = useState(false);

  const cancelInquiry = () => {
    axios.patch(`/api/inquiries/${inquiry.inquiryId}/cancel`)
      .then(() => onCancel(inquiry.inquiryId))
      .catch((err) => console.error(err));
  };

  const submitReply = () => {
    if (!replyContent.trim()) {
      alert("?듬? ?댁슜???낅젰?댁＜?몄슂.");
      return;
    }

    axios.post("/replies", {
      inquiryId: inquiry.inquiryId,
      content: replyContent
    })
      .then(() => {
        alert("?듬????깅줉?섏뿀?듬땲??");
        setReplyContent("");
        setOpen(false);
        onReply(inquiry.inquiryId);
      })
      .catch((err) => {
        console.error(err);
        alert("?듬? ?깅줉 以??ㅻ쪟媛 諛쒖깮?덉뒿?덈떎.");
      });
  };

  return (
    <article className="surface-card inquiry-card">
      <div className="inquiry-card-header">
        <button
          type="button"
          className="inquiry-toggle"
          onClick={() => setOpen(!open)}
        >
          <span>{inquiry.type} - {inquiry.user.name}</span>
          <span className={`toggle-indicator ${open ? "open" : ""}`}>⌄</span>
        </button>
      </div>

      <div className="inquiry-meta">
        <p>{inquiry.content}</p>
        <small>?묒꽦?? {inquiry.createdAt}</small>
      </div>

      {inquiry.imageUrls.length > 0 && (
        <div className="inquiry-images">
          {inquiry.imageUrls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt="inquiry"
              className="inquiry-image"
            />
          ))}
        </div>
      )}

      {open && (
        <div className="reply-box">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="?듬? ?댁슜???낅젰?섏꽭??"
            rows="4"
            className="field-input field-textarea"
          />

          <div className="reply-actions">
            <button type="button" className="table-action-button primary" onClick={submitReply}>
              ?듬??섍린
            </button>
            <button type="button" className="table-action-button secondary" onClick={cancelInquiry}>
              痍⑥냼
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default InquiryItem;
