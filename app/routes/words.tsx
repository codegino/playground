import type { LoaderFunction } from "remix";
import { useLoaderData, Link, Outlet, useNavigate } from "remix";
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

export default function Index() {
  const words = useLoaderData<Word[]>();
  const navigate = useNavigate();

  return (
    <div>
      <h1>English words I learned</h1>
      <button onClick={() => navigate("/words/add")}>Add new word</button>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ul>
          {words.map((word) => (
            <li key={word.id}>
              <Link to={`/words/${word.id}`}>
                {word.name} | {word.type}
              </Link>
            </li>
          ))}
        </ul>
        <Outlet />
      </div>
    </div>
  );
}
