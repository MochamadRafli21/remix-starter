import type { ActionFunctionArgs } from "@remix-run/node";
import { useEffect } from "react";
import { Form, redirect, useActionData } from "@remix-run/react";
import bcrypt from "bcryptjs";
import { db } from "~/db/client";
import { users } from "~/db/schema";
import { eq } from "drizzle-orm";
import { useToast } from "~/hooks/use-toast";
import { Input, Label, Button } from "~/components/ui";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response(
      JSON.stringify({
        error: "Missing fields",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Check if user already exists
  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length > 0) {
    return new Response(
      JSON.stringify({
        error: "User already exist",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  await db.insert(users).values({
    email,
    password: hashedPassword,
  });

  // Redirect to login or auto-login
  return redirect("/login");
};

export default function RegisterPage() {
  const actionData = useActionData<typeof action>();
  const { toast } = useToast();

  useEffect(() => {
    if (actionData?.error) {
      toast({
        title: "Registration Failed",
        description: actionData.error,
        variant: "destructive",
      });
    }
  }, [actionData, toast]);

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
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
          Register
        </Button>
      </Form>
    </div>
  );
}
