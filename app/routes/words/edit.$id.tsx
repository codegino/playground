import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import WordForm from "~/components/WordForm";
import { Word } from "~/models/word";
import { supabase } from "~/libs/supabase-client";

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
  console.log(data);

  return <WordForm word={data} />;
}
