// src/components/common/TextArea.jsx
export default function TextArea({ label, value, onChange, placeholder }) {
  return (
    <div className="field-group">
      <label className="field-label">{label}</label>

      <textarea
        className="field-input field-textarea"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={8}
      />
    </div>
  );
}
