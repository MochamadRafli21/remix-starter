import { ThemeToggle } from "~/components/ui";
import { LogoutButton } from "./logout-button";
import { Button } from "~/components/ui/button";
import { useUser } from "~/components/provider";
import { Link } from "@remix-run/react";

export function Navbar() {
  const { user } = useUser();
  return (
    <div className="w-full flex justify-between items-center px-4 py-2 border-b border-gray-700 dark:border-gray-400">
      <h1 className="font-bold">Your App Name</h1>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {user ? (
          <LogoutButton />
        ) : (
          <>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
