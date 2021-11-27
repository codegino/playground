import { redirect } from "remix";
import type { ActionFunction } from "remix";
import { supabase } from "~/libs/supabase-client";
import WordForm from "~/components/WordForm";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const newWord = {
    name: formData.get("name"),
    type: formData.get("type"),
    sentences: formData.getAll("sentence"),
    definitions: formData.getAll("definition"),
  };

  const { data } = await supabase.from("words").insert([newWord]).single();

  return redirect(`/words/${data?.id}`);
};

export default function AddWord() {
  return <WordForm />;
}
