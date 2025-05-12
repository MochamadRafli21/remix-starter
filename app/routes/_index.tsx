import type { MetaFunction } from "@remix-run/node";
import { useUser } from "~/components/provider";

export const meta: MetaFunction = () => {
  return [
    { title: "Your App Name" },
    { name: "description", content: "Welcome to Your App!" },
  ];
};

export default function Index() {
  const { user } = useUser();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        Hello {user?.email}
      </div>
    </div>
  );
}
