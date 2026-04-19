// src/components/posts/PostCreateForm.jsx
import { useMemo, useState } from "react";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import { createPost } from "@/api/postApi";

export default function PostCreateForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const imageSummary = useMemo(() => {
    if (images.length === 0) {
      return "?좏깮?? ?대?吏媛 ?놁뒿?덈떎.";
    }

    return `${images.length}媛쒖쓽 ?뚯씪???좏깮?섏뿀?듬땲??`;
  }, [images]);

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
    <section className="post-form-card surface-card">
      <div className="post-form-header">
        <p className="eyebrow">Content Studio</p>
        <h2 className="section-title">?륅툘 寃뚯떆湲 ?묒꽦?섍린</h2>
        <p className="post-form-description">
          ?쒕ぉ怨? 蹂몃Ц, ?대?吏瑜? ?섑븳 踰덉뿉 愿由ы븯怨? 寃뚯떆湲?? ?묒꽦?섏꽭??
        </p>
      </div>

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

      <div className="field-group">
        <label className="field-label">?대?吏 ?낅줈??</label>
        <div className="file-upload-box">
          <input
            className="file-input"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files ?? []))}
          />
          <p className="file-upload-hint">{imageSummary}</p>
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={!title || !content}>
        寃뚯떆湲 ?깅줉
      </Button>
    </section>
  );
}
