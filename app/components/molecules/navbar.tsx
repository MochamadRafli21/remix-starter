import {
  ThemeToggle,
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui";
import { DoorOpen, Menu } from "lucide-react";
import { LogoutButton } from "./logout-button";
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
          <>
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Menu />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <DialogTrigger>
                      <Button variant="ghost">
                        <DoorOpen />
                        Logout
                      </Button>
                    </DialogTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    Logging out will end your current session. Are you sure you
                    want to continue?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <LogoutButton />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
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
