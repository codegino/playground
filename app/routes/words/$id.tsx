import { LoaderFunction, useLoaderData } from "remix";
import { supabase } from "~/libs/supabase-client";
import { Word } from "~/models/word";

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

  return (
    <div>
      <h3>
        {word.name} | {word.type}
      </h3>
      {word.definitions.map((definition, i) => (
        <p key={i}>
          <i>{definition}</i>
        </p>
      ))}
      {word.sentences.map((sentence, i) => (
        <p key={i}>{sentence}</p>
      ))}
    </div>
  );
}
