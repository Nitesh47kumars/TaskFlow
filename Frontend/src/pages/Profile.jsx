import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put("/users/me", formData);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        {message && (
          <p className="bg-green-100 text-green-700 p-2 rounded mb-3">
            {message}
          </p>
        )}

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-3">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={logout}
              className="text-red-600 font-medium"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
