import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-gray-500 mb-4">Page not found</p>

      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
