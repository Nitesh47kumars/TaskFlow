import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>

      <div className="flex items-center gap-4">
        <div className="flex space-x-3">
          <Link to="/dashboard" className="text-gray-600 hover:text-black">
            Dashboard
          </Link>

          <Link to="/profile" className="text-gray-600 hover:text-black">
            Profile
          </Link>
        </div>

        <button
          onClick={logout}
          className="px-3 py-2 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
