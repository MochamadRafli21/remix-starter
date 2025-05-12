import { redirect } from "@remix-run/node";
import { getSession, destroySession } from "~/services/auth.server";

export const action = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
