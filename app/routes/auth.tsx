import { Auth } from "@supabase/ui";
import { useSubmit, redirect } from "remix";
import type { ActionFunction } from "remix";
import React, { useEffect } from "react";
import { useSupabase } from "~/utils/supabase-client";
import { commitSession, getSession } from "~/utils/supabase.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const session = await getSession(request.headers.get("Cookie"));

  session.set("access_token", formData.get("access_token"));
  session.set("uuid", formData.get("uuid"));

  return redirect("/words", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

const Container: React.FC = ({ children }) => {
  const { user, session } = Auth.useUser();
  const submit = useSubmit();

  useEffect(() => {
    if (user) {
      const formData = new FormData();

      const accessToken = session?.access_token;

      if (accessToken) {
        formData.append("access_token", accessToken);
        formData.append("uuid", user.id);
        submit(formData, { method: "post", action: "/auth" });
      }
    }
  }, [user]);

  return <>{children}</>;
};

export default function AuthBasic() {
  const supabase = useSupabase();

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container>
        <Auth supabaseClient={supabase} />
      </Container>
    </Auth.UserContextProvider>
  );
}
