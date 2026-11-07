// src/components/recognizer-form/ValidationErrorList.jsx
export default function ValidationErrorList({ errors }) {
  return (
    <ul className="mt-1.5 space-y-1" role="alert">
      {errors.map(({ message, position }) => (
        <li key={`${position}-${message}`} className="text-xs text-red-700">
          ✕ {message}
          {position != null && ` (position ${position})`}.
        </li>
      ))}
    </ul>
  );
}