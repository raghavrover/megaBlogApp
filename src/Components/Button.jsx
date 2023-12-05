function Button({ children, type, className = "" }) {
  return (
    <button
      className={`px-4 py-2 rounded-3xl hover:bg-slate-200 hover:text-slate-700 ${className}`}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
