import { Form, LoaderFunction, useTransition } from "remix";
import { useLoaderData, Link, Outlet } from "remix";
import { Button } from "~/components/basic/button";
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
    <main className="p-2">
      <h1 className="text-3xl text-center mb-3">English words I learned</h1>
      <div className="text-center mb-2">Route State: {transition.state}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl pb-2">Words</h2>
          <ul>
            {words.map((word) => (
              <li key={word.id}>
                <Link to={`/words/${word.id}`}>
                  {word.name} | {word.type}
                </Link>
              </li>
            ))}
          </ul>
          <Form method="get" action={"/words/add"} className="pt-2">
            <Button
              type="submit"
              className="hover:bg-primary-100 dark:hover:bg-primary-900"
            >
              Add new word
            </Button>
          </Form>
        </div>
        <Outlet />
      </div>
    </main>
  );
}
