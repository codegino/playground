import { destroySession, getSession } from "../utils/supabase.server";
import { redirect } from "remix";
import type { ActionFunction } from "remix";

export const action: ActionFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));

  return redirect("/auth", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export const loader = () => {
  return redirect("/");
};
