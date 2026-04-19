// src/components/common/TextInput.jsx
export default function TextInput({ label, value, onChange, placeholder }) {
  return (
    <div className="field-group">
      <label className="field-label">{label}</label>

      <input
        className="field-input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
