import { ThemeToggle } from "~/components/ui";
export function Navbar() {
  return (
    <div className="w-full flex justify-between items-center px-4 py-2 border-b border-gray-700 dark:border-gray-400">
      <h1 className="font-bold">Your App Name</h1>
      <ThemeToggle />
    </div>
  );
}
