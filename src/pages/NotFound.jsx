import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="w-full h-screen bg-slate-500 flex flex-col justify-center items-center">
      <h1 className="text-xl text-cyan-300 mb-6">Your Page is Not Found</h1>
      <p className="text-md">
        Please get back to <Link className="text-green-500">Home</Link> page
      </p>
    </div>
  );
}

export default NotFound;
