import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[100vh] grid place-items-center bg-white text-gray-900 dark:bg-black dark:text-gray-200">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-5xl font-light tracking-[0.3em]">404</h1>
        <p className="text-sm uppercase tracking-widest">Page not found</p>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-current rounded-sm transition-all hover:bg-gray-50 dark:hover:bg-white/10"
          >
            Go Back
          </button>

        <Link
            to="/"
            className="px-4 py-2 rounded-sm transition-all bg-black text-white hover:opacity-90 dark:bg-white dark:text-black"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
