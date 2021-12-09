import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "remix";
import type { LinksFunction } from "remix";
import tailwindStyles from "~/styles/tailwind.css";
import appStyles from "~/styles/app.css";
import { createClient } from "@supabase/supabase-js";
import { SupabaseProvider } from "./utils/supabase-client";

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
  return <main>{children}</main>;
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 404:
      message = <p>This is a custom error message for 404 pages</p>;
      break;
    // You can customize the behavior for other status codes
    default:
      throw new Error(caught.data || caught.statusText);
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
