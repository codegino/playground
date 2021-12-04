import { Form, useTransition } from "remix";
import { Word, WordType } from "~/models/word";
import { Button } from "../basic/button";
import { Input } from "../basic/input";
import { Select } from "../basic/select";
import { TextArea } from "../basic/textarea";

export function WordForm({ word }: { word?: Word }) {
  let transition = useTransition();

  return (
    <Form
      method="post"
      className={`
        px-3 py-4 rounded flex flex-col gap-2 border-2
      `}
    >
      <div>Form State: {transition.state}</div>
      <div>
        <label className="block text-xs" htmlFor="name">
          Word
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Word"
          required
          defaultValue={word?.name ?? ""}
          disabled={Boolean(word?.name)}
        />
      </div>
      <div>
        <label className="block text-xs" htmlFor="type">
          Type
        </label>
        <Select
          id="type"
          name="type"
          defaultValue={word?.type ?? WordType.NOUN}
        >
          <option value={WordType.NOUN}>Noun</option>
          <option value={WordType.VERB}>Verb</option>
          <option value={WordType.ADJECTIVE}>Adjective</option>
        </Select>
      </div>
      <div>
        {word?.sentences.map((sentence, i) => (
          <SentenceField index={i + 1} sentence={sentence} key={i} />
        )) ?? <SentenceField index={1} sentence={""} />}
      </div>
      <div>
        {word?.definitions.map((definition, i) => (
          <DefinitionField index={i + 1} definition={definition} key={i} />
        )) ?? <DefinitionField index={1} definition={""} />}
      </div>
      <Button type="submit" color="primary">
        Submit
      </Button>
    </Form>
  );
}

const SentenceField = ({ index, sentence }) => (
  <div>
    <label className="block text-xs" htmlFor={`sentence.${index}`}>
      Sentence #{index}
    </label>
    <TextArea
      id={`sentence.${index}`}
      name="sentence"
      defaultValue={sentence}
      placeholder={`Sentence #${index}`}
      minLength={10}
    />
  </div>
);

const DefinitionField = ({ index, definition }) => (
  <div>
    <label className="block text-xs" htmlFor={`definition.${index}`}>
      Definition #{index}
    </label>
    <TextArea
      id={`definition.${index}`}
      name="definition"
      defaultValue={definition}
      placeholder={`Definition #${index}`}
      minLength={10}
    />
  </div>
);
