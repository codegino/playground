import type { LoaderFunction } from "remix";
import { useLoaderData, Link } from "remix";
import { supabase } from "~/libs/supabase-client";
import { Word } from "~/models/word";

export const loader: LoaderFunction = async () => {
  const { data: words } = await supabase
    .from<Word>("words")
    .select("id,name,type");

  // We can pick and choose what we want to display
  // This can solve the issue of over-fetching or under-fetching
  return words;
};

// export const loader ...

export default function Index() {
  const words = useLoaderData<Word[]>();

  return (
    <div>
      <h1>English words I learned</h1>
      <ul>
        {words.map((word) => (
          <li key={word.id}>
            <div>
              <Link to={`/words/${word.id}`}>
                {word.name} | {word.type}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
