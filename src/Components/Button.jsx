function Button({ children, className = "" }) {
  return (
    <button
      className={`px-4 py-2 rounded-3xl hover:bg-slate-200 hover:text-slate-400 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;