import { forwardRef, useId } from "react";

const MyInput = forwardRef(function Input(
  { label, type, placeholder, className = "" },
  ref
) {
  const id = useId();

  return (
    <div className="w-full flex flex-col items-start">
      {label && (
        <label htmlFor={id} className="text-xs text-cyan-200">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`w-full h-10 px-4 py-6 rounded-md ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
});

// You can name this module however you want while importing if it is exported as default export
export default MyInput;
