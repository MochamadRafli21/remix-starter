import { LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/db/client";
import { refreshTokens, users } from "~/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const refreshToken = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "");

  if (!refreshToken) {
    return new Response(
      JSON.stringify({ error: "No refresh token provided" }),
      { status: 400 }
    );
  }

  const tokenRecord = await db
    .select()
    .from(refreshTokens)
    .where(eq(refreshTokens.token, refreshToken));

  if (!tokenRecord) {
    return new Response(JSON.stringify({ error: "Invalid refresh token" }), {
      status: 401,
    });
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, tokenRecord[0].userId));

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const newAccessToken = jwt.sign(
    { id: user[0].id, email: user[0].email },
    process.env.JWT_SECRET!,
    {
      expiresIn: "15m",
    }
  );

  return JSON.stringify({ accessToken: newAccessToken });
};
