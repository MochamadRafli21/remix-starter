import { Form } from "@remix-run/react";
import { Button, Input, Label } from "~/components/ui";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-sm mx-auto mt-24">
      <h2 className="text-2xl mb-4">Register</h2>
      <Form method="post">
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" id="email" required />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password" required />
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </Form>
    </div>
  );
}
