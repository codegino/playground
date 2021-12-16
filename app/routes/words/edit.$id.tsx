import { useLoaderData, redirect, json, useCatch } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import { WordForm } from "~/components/word-form";
import type { Word } from "~/models/word";
import { getSession, setAuthToken, supabase } from "~/utils/supabase.server";
import { WordsErrorBoundary } from "~/components/WordsErrorBoundary";

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const id = params.id as string;

  const updates = {
    type: formData.get("type"),
    sentences: formData.getAll("sentence"),
    definitions: formData.getAll("definition"),
  };

  // Auth Related Code
  await setAuthToken(request);

  await supabase.from("words").update(updates).eq("id", id);

  return redirect(`/words/${id}`);
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const { data } = await supabase
    .from<Word>("words")
    .select("*")
    .eq("id", params.id as string)
    .single();

  if (!data) {
    throw json({ message: "Word could not be found" }, 404);
  }

  return data;
};

export default function EditWord() {
  const data = useLoaderData<Word>();

  return <WordForm word={data} />;
}

export function CatchBoundary() {
  return <WordsErrorBoundary />;
}
