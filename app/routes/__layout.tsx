import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const user = await authenticator.authenticate("user-pass", request);
    return { user };
  } catch {
    return { user: null };
  }
};
