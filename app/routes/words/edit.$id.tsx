import { useLoaderData, redirect } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import WordForm from "~/components/WordForm";
import { Word } from "~/models/word";
import { supabase } from "~/libs/supabase-client";

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const id = params.id as string;

  const updates = {
    type: formData.get("type"),
    sentences: formData.getAll("sentence"),
    definitions: formData.getAll("definition"),
  };

  await supabase.from("words").update(updates).eq("id", id);

  return redirect(`/words/${id}`);
};

export const loader: LoaderFunction = async ({ params }) => {
  const { data } = await supabase
    .from<Word>("words")
    .select("*")
    .eq("id", params.id as string)
    .single();

  return data;
};

export default function EditWord() {
  const data = useLoaderData<Word>();

  return <WordForm word={data} />;
}
