import {
  ErrorBoundaryComponent,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useSubmit,
} from "remix";
import type { LinksFunction } from "remix";
import tailwindStyles from "~/styles/tailwind.css";
import appStyles from "~/styles/app.css";
import { createClient } from "@supabase/supabase-js";
import { SupabaseProvider, useSupabase } from "./utils/supabase-client";
import { Button } from "./components/basic/button";

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStyles },
    {
      rel: "stylesheet",
      href: appStyles,
    },
  ];
};

export const loader = () => {
  return {
    supabaseKey: process.env.SUPABASE_ANON_KEY,
    supabaseUrl: process.env.SUPABASE_URL,
  };
};

export default function App() {
  const loader = useLoaderData();

  const supabase = createClient(loader.supabaseUrl, loader.supabaseKey);

  return (
    <Document>
      <SupabaseProvider supabase={supabase}>
        <Layout>
          <Outlet />
        </Layout>
      </SupabaseProvider>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: React.PropsWithChildren<{}>) {
  const submit = useSubmit();
  const supabase = useSupabase();

  const handleSignOut = () => {
    supabase.auth.signOut().then(() => {
      submit(null, { method: "post", action: "/signout" });
    });
  };

  return (
    <main>
      <header>
        {supabase?.auth?.session() && (
          <Button type="button" onClick={handleSignOut}>
            Sign out
          </Button>
        )}
      </header>
      {children}
    </main>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <Document>
      <Layout>
        <p>An error has occur</p>
        <p>{error.message}</p>
      </Layout>
    </Document>
  );
};

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 404:
      message = <p>This is a custom error message for 404 pages</p>;
      break;
    // You can customize the behavior for other status codes
    default: {
      throw new Error(JSON.stringify(caught.data) || caught.statusText);
    }
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}
