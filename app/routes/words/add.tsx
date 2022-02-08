import { redirect } from "remix";
import type { ActionFunction } from "remix";
import { setAuthToken, supabase } from "~/utils/supabase.server";
import { WordForm } from "~/components/word-form";
import { WordsErrorBoundary } from "~/components/WordsErrorBoundary";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // Auth Related Code
  const session = await setAuthToken(request);

  const newWord = {
    name: formData.get("name"),
    type: formData.get("type"),
    sentences: formData.getAll("sentence"),
    definitions: formData.getAll("definition"),
    user_id: session.get("uuid"),
  };

  const { data, error } = await supabase
    .from("words")
    .insert([newWord])
    .single();

  if (error) {
    return redirect(`/words`);
  }

  return redirect(`/words/${data?.id}`);
};

export default function AddWord() {
  return <WordForm />;
}

export function CatchBoundary() {
  return <WordsErrorBoundary />;
}
