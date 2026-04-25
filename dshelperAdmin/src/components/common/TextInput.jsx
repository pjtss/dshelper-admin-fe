export default function TextInput({ label, value, onChange, placeholder }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control form-control-lg rounded-4"
      />
    </div>
  );
}
