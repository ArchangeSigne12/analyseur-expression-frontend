// src/components/recognizer-form/FormActionButton.jsx
const variantClasses = {
  primary:
    "bg-blue-700 text-white hover:bg-blue-800 disabled:bg-blue-300 disabled:hover:bg-blue-300",
  secondary:
    "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 disabled:text-slate-400 disabled:hover:bg-white",
};

export default function FormActionButton({
  children,
  onClick,
  disabled = false,
  variant = "primary",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-md px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}