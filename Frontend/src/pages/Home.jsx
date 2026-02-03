import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">TaskFlow</h1>
      <p className="text-gray-600 mb-6">
        Manage your tasks efficiently
      </p>

      <div className="flex gap-4">
        {user ? (
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 border rounded"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
