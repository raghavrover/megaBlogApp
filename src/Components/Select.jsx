import { useId, forwardRef } from "react";

const Select = forwardRef(function Select(
  { label, options, className, ...props },
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
      <select
        className={`${className} text-black bg-white w-full px-2 py-3 rounded-md `}
        id={id}
        ref={ref}
        {...props}
      >
        {options?.map((element) => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
