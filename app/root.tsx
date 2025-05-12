import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getSession } from "~/services/auth.server";
import { Toaster } from "~/components/ui";
import { Navbar } from "./components/molecules/navbar";
import { ThemeProvider, UserProvider } from "~/components/provider";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

type LoaderData = {
  user: {
    id: string;
    email: string;
  } | null;
};

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

const setInitialTheme = () => {
  const script = `
    (function() {
      try {
        const theme = localStorage.getItem("theme");
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (theme === "dark" || (!theme && systemDark)) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch (_) {}
    })();
  `;
  return script;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");

  return new Response(JSON.stringify({ user }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useLoaderData<LoaderData>();
  return (
    <ThemeProvider>
      <UserProvider initialUser={user}>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <Meta />
            <Links />
            <script dangerouslySetInnerHTML={{ __html: setInitialTheme() }} />
          </head>
          <body>
            <Navbar />
            {children}
            <ScrollRestoration />
            <Scripts />
            <Toaster />
          </body>
        </html>
      </UserProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return <Outlet />;
}
