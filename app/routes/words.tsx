import { Form, LoaderFunction, useTransition } from "remix";
import { useLoaderData, Link, Outlet } from "remix";
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
  let transition = useTransition();

  return (
    <div>
      <h1>English words I learned</h1>
      <Form method="get" action={"/words/add"}>
        <button type="submit">Add new word</button>
      </Form>
      <div>Route State: {transition.state}</div>
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
