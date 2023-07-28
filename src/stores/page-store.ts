import { atom, selector } from "recoil";

export const StartState = atom({
  key: "StartState",
  default: 1,
});

export const CurrentState = atom({
  key: "CurrentState",
  default: 1,
});

export const ItemsState = atom({
  key: "ItemsState",
  default: 5,
});

export interface QuestionDataType {
  _id?: string;
  id: number | undefined;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  author: string;
  hashtags: string[];
  votes: number;
  answers?: number;
  views: number;
}

const defaultQuestionData: QuestionDataType[] = [
  {
    _id: "",
    id: 0,
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    userId: 0,
    author: "",
    hashtags: [],
    votes: 0,
    answers: 0,
    views: 0,
  },
];

export const QuestionData = atom<QuestionDataType[]>({
  key: "QuestionData",
  default: defaultQuestionData,
});

// 전체 글 리스트
export const QuestionListState = selector({
  key: "QuestionListState",
  get: ({ get }) => QuestionData,
  set: ({ set }, newValue) => set(QuestionData, newValue),
});
