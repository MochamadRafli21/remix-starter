import { redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/" });
  return redirect("/");
};
