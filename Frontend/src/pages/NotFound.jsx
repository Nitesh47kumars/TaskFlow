import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <div className="relative">
        <h1 className="text-[12rem] font-black text-slate-300 blur-sm leading-none">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Page Not Found
          </h2>
          <p className="text-slate-500 mb-8">
            The link you followed might be broken.
          </p>
          <Link
            to="/"
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
