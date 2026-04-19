// src/components/posts/PostCreateForm.jsx
import { useState } from "react";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import { createPost } from "@/api/postApi";

export default function PostCreateForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async () => {
    const dto = { title, content };

    try {
      await createPost(dto, images);
      alert("게시글이 성공적으로 등록되었습니다.");
      setTitle("");
      setContent("");
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        padding: 24,
        borderRadius: 14,
        border: "1px solid #dbeafe",
        boxShadow: "0 12px 32px rgba(37, 99, 235, 0.08)",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          fontSize: 22,
          marginBottom: 20,
          fontWeight: 700,
          color: "#1d4ed8",
        }}
      >
        게시글 작성하기
      </h2>

      <TextInput
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="게시글 제목을 입력하세요"
      />

      <TextArea
        label="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
      />

      <div style={{ marginBottom: 20, width: "100%", boxSizing: "border-box" }}>
        <label style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>
          이미지 업로드
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files))}
          style={{ width: "100%", boxSizing: "border-box" }}
        />
      </div>

      <Button onClick={handleSubmit} disabled={!title || !content}>
        게시글 등록
      </Button>
    </div>
  );
}
