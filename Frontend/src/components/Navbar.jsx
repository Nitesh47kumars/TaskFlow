import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>

      <div className="flex items-center gap-4">
        {user && (
          <div className="text-sm text-right">
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        )}

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
