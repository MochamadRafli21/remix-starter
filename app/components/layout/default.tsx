import { useLoaderData, Link } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const Layout = ({ children }) => {
  const user = useLoaderData();

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <Link to="/" className="text-lg">
          My App
        </Link>
        <nav>
          {user ? (
            <>
              <span>Welcome, {user.email}</span>
              <Link to="/logout" className="ml-4">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="ml-4">
                Login
              </Link>
              <Link to="/register" className="ml-4">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};
