import { Form, redirect } from "remix";
import { WordType } from "~/models/word";
import type { ActionFunction } from "remix";
import { supabase } from "~/libs/supabase-client";

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
  return (
    <Form method="post">
      <div>
        <label htmlFor="name">Word</label>
        <input id="name" name="name" type="text" placeholder="Word" required />
      </div>
      <div>
        <label htmlFor="type">Type</label>
        <select id="type" name="type" defaultValue={WordType.NOUN}>
          <option value={WordType.NOUN}>Noun</option>
          <option value={WordType.VERB}>Verb</option>
          <option value={WordType.ADJECTIVE}>Adjective</option>
        </select>
      </div>
      <div>
        <label htmlFor="sentence.1">Sentences</label>
        <textarea
          id="sentence.1"
          name="sentence"
          placeholder="Sentence"
          minLength={10}
        />
      </div>
      <div>
        <label htmlFor="definition.1">Definitions</label>
        <textarea
          id="definition.1"
          name="definition"
          placeholder="Definition"
          minLength={10}
        />
      </div>
      <button type="submit">Submit</button>
    </Form>
  );
}
