import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import bcrypt from "bcryptjs";
import { db } from "~/db/client";
import { users } from "~/db/schema";
import { eq } from "drizzle-orm";
import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET!;
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
export const authenticator = new Authenticator();

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const result = await db.select().from(users).where(eq(users.email, email));
    const user = result[0];

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error("Invalid credentials");
    }

    return { id: user.id, email: user.email };
  }),
  "user-pass"
);
