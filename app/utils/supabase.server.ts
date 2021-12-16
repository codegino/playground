import { createClient } from "@supabase/supabase-js";
import { createCookieSessionStorage } from "remix";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "supabase-session",

      // all of these are optional
      expires: new Date(Date.now() + 3600),
      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };

export const setAuthToken = async (request: Request) => {
  let session = await getSession(request.headers.get("Cookie"));

  supabase.auth.setAuth(session.get("access_token"));

  return session;
};
