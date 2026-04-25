export default function Button({ children, onClick, disabled, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-primary btn-lg w-100 fw-bold rounded-4 ${className}`}
    >
      {children}
    </button>
  );
}
