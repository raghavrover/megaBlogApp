function Container({ children }) {
  return (
    <div className="w-full min-h-[calc(100vh_-_90px)] py-8 flex justify-center items-start">
      {children}
    </div>
  );
}

export default Container;
