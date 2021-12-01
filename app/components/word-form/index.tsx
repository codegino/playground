import { Form, useTransition } from "remix";
import { Word, WordType } from "~/models/word";
import type { LinksFunction } from "remix";
import { Button, links as buttonStyles } from "../basic/button";
import { Input, links as inputStyles } from "../basic/input";
import { Select, links as selectStyles } from "../basic/select";
import { TextArea, links as textAreaStyles } from "../basic/textarea";
import styles from "./styles.css";

export const links: LinksFunction = () => [
  ...buttonStyles(),
  ...inputStyles(),
  ...selectStyles(),
  ...textAreaStyles(),
  {
    rel: "stylesheet",
    href: styles,
  },
];

export function WordForm({ word }: { word?: Word }) {
  let transition = useTransition();

  return (
    <Form method="post" className="word-form">
      <div>Form State: {transition.state}</div>
      <div>
        <label htmlFor="name">Word</label>
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
        <label htmlFor="type">Type</label>
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
    <label htmlFor={`sentence.${index}`}>Sentence #{index}</label>
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
    <label htmlFor={`definition.${index}`}>Definition #{index}</label>
    <TextArea
      id={`definition.${index}`}
      name="definition"
      defaultValue={definition}
      placeholder={`Definition #${index}`}
      minLength={10}
    />
  </div>
);
