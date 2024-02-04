import { atom, selector } from 'recoil';

export interface QuestionDataType {
  _id?: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  comments?: number;
  userId: string;
  hashtags: string[];
  votes: number;
  saves: number;
  answers?: number;
  views: number;
  isDeleted: boolean;
}

const defaultQuestionData: QuestionDataType[] = [
  {
    _id: '',
    title: '',
    content: '',
    createdAt: '',
    updatedAt: '',
    userId: '',
    author: '',
    hashtags: [],
    votes: 0,
    saves: 0,
    answers: 0,
    views: 0,
    isDeleted: false,
  },
];

export const QuestionData = atom<QuestionDataType[]>({
  key: 'QuestionData',
  default: defaultQuestionData,
});

// 전체 글 리스트
export const QuestionListState = selector({
  key: 'QuestionListState',
  get: ({ get }) => QuestionData,
  set: ({ set }, newValue) => set(QuestionData, newValue),
});

export const hashtagState = atom({
  key: 'hashtagState',
  default: [] as string[],
});

export const clickState = atom({
  key: 'clickState',
  default: false,
});