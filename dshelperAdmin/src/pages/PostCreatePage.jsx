// src/pages/PostCreatePage.jsx
import PostCreateForm from "@/components/posts/PostCreateForm";

export default function PostCreatePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", maxWidth: 650, boxSizing: "border-box" }}>
        <PostCreateForm />
      </div>
    </div>
  );
}
