import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
  useTransition,
} from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import { supabase } from "~/libs/supabase-client";
import { Word } from "~/models/word";

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  if (formData.get("_method") === "delete") {
    await supabase
      .from<Word>("words")
      .delete()
      .eq("id", params.id as string);

    return redirect("/words");
  }
};

export const loader: LoaderFunction = async ({ params }) => {
  const { data } = await supabase
    .from<Word>("words")
    .select("*")
    .eq("id", params.id as string)
    .single();

  return data;
};

export default function Word() {
  const word = useLoaderData<Word>();
  const navigate = useNavigate();
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
      <Form method="post">
        <input type="hidden" name="_method" value="delete" />
        <button type="submit">Delete</button>
      </Form>
      <button type="button" onClick={() => navigate(`/words/edit/${word.id}`)}>
        Edit
      </button>
    </div>
  );
}
