import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { Input, Label, Button } from "~/components/ui";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    await authenticator.authenticate("user-pass", request);
    return redirect("/dashboard");
  } catch (error) {
    return new Response("Invalid credentials", { status: 401 });
  }
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Form method="post" className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Log In
        </Button>
      </Form>
    </div>
  );
}
