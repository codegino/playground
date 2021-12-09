import { Form, useLoaderData, redirect, useTransition } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import type { Word } from "~/models/word";
import { Input } from "~/components/basic/input";
import { Button } from "~/components/basic/button";
import { setAuthToken, supabase } from "~/utils/supabase.server";
import { useSupabase } from "~/utils/supabase-client";

// Here's the action to handle deletion
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  // Auth Related Code
  await setAuthToken(request);

  if (formData.get("_method") === "delete") {
    await supabase
      .from<Word>("words")
      .delete()
      .eq("id", params.id as string);

    return redirect("/words");
  }
};

export const loader: LoaderFunction = async ({ params }) => {
  // No need to add auth here, because GET /words is public
  const { data } = await supabase
    .from<Word>("words")
    .select("*")
    .eq("id", params.id as string)
    .single();

  return data;
};

export default function Word() {
  const word = useLoaderData<Word>();
  const supabase = useSupabase();
  let transition = useTransition();

  return (
    <div>
      <h3>
        {word.name} | {word.type}
      </h3>
      <div>Form State: {transition.state}</div>
      {word.definitions.map((definition, i) => (
        <p key={i}>
          <i>{definition}</i>
        </p>
      ))}
      {word.sentences.map((sentence, i) => (
        <p key={i}>{sentence}</p>
      ))}

      {/* Adding conditional rendering might cause a warning,
      We'll deal with it later */}
      {supabase.auth.user() && (
        <>
          <Form method="post">
            <Input type="hidden" name="_method" value="delete" />
            <Button type="submit" className="w-full">
              Delete
            </Button>
          </Form>
          <Form method="get" action={`/words/edit/${word.id}`} className="flex">
            <Button type="submit" color="primary" className="w-full">
              Edit
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}
