export default function TextArea({ label, value, onChange, placeholder }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={8}
        className="form-control rounded-4"
        style={{ resize: "none" }}
      />
    </div>
  );
}
