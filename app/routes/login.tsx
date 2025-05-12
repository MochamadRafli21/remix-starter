import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData, useRoutes } from "@remix-run/react";
import {
  authenticator,
  getSession,
  commitSession,
} from "~/services/auth.server";
import { Input, Label, Button } from "~/components/ui";
import { useEffect } from "react";
import { useUser } from "~/components/provider";
import { useNavigate } from "@remix-run/react";
import { useToast } from "~/hooks/use-toast";

type User = {
  id: string;
  email: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const user = (await authenticator.authenticate(
      "user-pass",
      request
    )) as User;

    const session = await getSession(request.headers.get("Cookie"));
    if (!user.id || !user.email || !session) {
      throw "Failed to get user";
    }
    session.set("user", { id: user.id, email: user.email });
    return new Response(
      JSON.stringify({
        data: user,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": await commitSession(session),
        },
      }
    );
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
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (actionData?.error) {
      toast({
        title: "Login Failed",
        description: actionData.error,
        variant: "destructive",
      });
    } else if (actionData?.data.id) {
      setUser(actionData?.data);
      navigate("/");
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
