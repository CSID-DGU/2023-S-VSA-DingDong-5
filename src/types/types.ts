export type AnswerDataType = {
  _id: string;
  content: string;
  questionTitle: string;
  questionId: string;
  author: string;
  votes: number;
  saves: number;
  createdAt: string;
  updatedAt: string;
};

export type QuestionDataType = {
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
};
