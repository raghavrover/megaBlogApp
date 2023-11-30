import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <div
        className={`min-h-screen w-full flex flex-wrap content-between bg-gray-400`}
      >
        <div className="w-full min-h-screen mx-auto flex flex-col items-center justify-between bg-slate-300 ">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
