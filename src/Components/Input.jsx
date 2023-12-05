import { forwardRef, useId } from "react";

const MyInput = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full flex flex-col items-start">
      {label && (
        <label htmlFor={id} className="text-sm inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`${className} w-full h-7 px-4 py-6 rounded-md`}
        {...props}
      />
    </div>
  );
});

// You can name this module however you want while importing if it is exported as default export
export default MyInput;
