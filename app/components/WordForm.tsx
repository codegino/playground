import { Form } from "remix";
import { Word, WordType } from "~/models/word";

export default function WordForm({ word }: { word?: Word }) {
  return (
    <Form method="post">
      <div>
        <label htmlFor="name">Word</label>
        <input
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
        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          defaultValue={word?.type ?? WordType.NOUN}
        >
          <option value={WordType.NOUN}>Noun</option>
          <option value={WordType.VERB}>Verb</option>
          <option value={WordType.ADJECTIVE}>Adjective</option>
        </select>
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
      <button type="submit">Submit</button>
    </Form>
  );
}

const SentenceField = ({ index, sentence }) => (
  <div>
    <label htmlFor={`sentence.${index}`}>Sentence #{index}</label>
    <textarea
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
    <label htmlFor={`definition.${index}`}>Definition #{index}</label>
    <textarea
      id={`definition.${index}`}
      name="definition"
      defaultValue={definition}
      placeholder={`Definition #${index}`}
      minLength={10}
    />
  </div>
);
