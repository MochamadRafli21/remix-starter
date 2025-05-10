import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { Input, Label, Button } from "~/components/ui";
import { useEffect } from "react";
import { useToast } from "~/hooks/use-toast";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    await authenticator.authenticate("user-pass", request);
    return redirect("/dashboard");
  } catch (error) {
    return new Response(
      JSON.stringify({
        error:
          "Failed to authenticate, please use the correct email and password",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const { toast } = useToast();

  useEffect(() => {
    if (actionData?.error) {
      toast({
        title: "Login Failed",
        description: actionData.error,
        variant: "destructive",
      });
    }
  }, [actionData, toast]);

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
