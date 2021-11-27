export enum WordType {
  NOUN = "noun",
  VERB = "verb",
  ADJECTIVE = "adjective",
}

export type Word = {
  id: number;
  name: string;
  sentences: string[];
  definitions: string[];
  type: WordType;
};
