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
      alert("寃뚯떆湲???깃났?곸쑝濡??깅줉?섏뿀?듬땲?? ?뮍");
      setTitle("");
      setContent("");
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("寃뚯떆湲 ?깅줉 ?ㅽ뙣 ?삟");
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
        ?륅툘 寃뚯떆湲 ?묒꽦?섍린
      </h2>

      <TextInput
        label="?쒕ぉ"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="寃뚯떆湲 ?쒕ぉ???낅젰?섏꽭??"
      />

      <TextArea
        label="?댁슜"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="?댁슜???낅젰?섏꽭??"
      />

      <div style={{ marginBottom: 20, width: "100%", boxSizing: "border-box" }}>
        <label style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>
          ?대?吏 ?낅줈??
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files))}
          style={{ width: "100%", boxSizing: "border-box" }}
        />
      </div>

      <Button onClick={handleSubmit} disabled={!title || !content}>
        寃뚯떆湲 ?깅줉
      </Button>
    </div>
  );
}
