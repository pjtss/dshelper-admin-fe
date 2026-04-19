// src/components/common/Button.jsx
export default function Button({ children, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="primary-button"
    >
      {children}
    </button>
  );
}
