import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-6 text-center">
      <div className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
        Productivity Redefined
      </div>
      <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
        Task<span className="text-blue-600">Flow</span>
      </h1>
      <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
        A seamless and minimal way to organize your life. Create, manage, and
        complete tasks with ease.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center">
        {user ? (
          <Link
            to="/dashboard"
            className="px-10 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="px-10 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all"
            >
              Login Now
            </Link>
            <Link
              to="/register"
              className="px-10 py-4 bg-white text-slate-700 font-bold border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
            >
              Create Account
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
