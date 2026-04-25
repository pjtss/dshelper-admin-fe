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
    <div className="page-card p-4 p-lg-5">
      <div className="mb-4">
        <div className="text-uppercase small fw-bold text-primary mb-2">Post</div>
        <h2 className="page-section-title mb-1">게시글 작성</h2>
        <p className="page-section-subtitle mb-0">제목, 본문, 이미지를 입력한 뒤 게시글을 등록합니다.</p>
      </div>

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

      <div className="mb-4">
        <label className="form-label fw-semibold">이미지 업로드</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files))}
          className="form-control form-control-lg rounded-4"
          multiple
        />
      </div>

      <Button onClick={handleSubmit} disabled={!title || !content}>
        게시글 등록
      </Button>
    </div>
  );
}
