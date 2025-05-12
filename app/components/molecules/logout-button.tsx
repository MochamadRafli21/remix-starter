import { useUser } from "~/components/provider";
import { Form, useSubmit } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export function LogoutButton() {
  const { setUser } = useUser();
  const submit = useSubmit();

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(null);
    submit({ method: "post", action: "/logout" });
  };

  return (
    <Form onSubmit={handleLogout}>
      <Button variant="destructive" type="submit">
        Logout
      </Button>
    </Form>
  );
}
