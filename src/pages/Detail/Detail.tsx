import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import type { QuestionDataType } from "../../stores/page-store";
import { QuestionForm, AnswerForm } from "../../components";
import { Root } from "./styled";
import DOMPurify from "dompurify";
import axios from "axios";

export const Detail = () => {
  // const [questionData, setQuestionData] = useRecoilState(QuestionData);
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionDataType | null>(null); // Change initial state to null

  let { id } = useParams<{ id?: string }>();

  const updateViews = useCallback(async () => {
    try {
      if (currentQuestion) {
        setCurrentQuestion({
          ...currentQuestion,
          views: currentQuestion?.views! + 1,
        });

        await axios.patch(`/api/articles/${id}`, {
          views: currentQuestion.views + 1,
        });
      }
    } catch (error) {
      console.error("Error updating views:", error);
      alert("조회수 업데이트 실패!");
    }
  }, [id, currentQuestion]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/articles/${id}`);
      const foundQuestion = response.data;
      if (foundQuestion) {
        setCurrentQuestion(foundQuestion);
      }
    } catch (error) {
      console.error(error);
      alert("게시판 정보 가져오기 실패!");
    }
  }, [id]);

  useEffect(() => {
    // Find the question with the matching ID
    /* const foundQuestion = questionData.find((item) => item._id === id);
  if (foundQuestion) {
    setCurrentQuestion(foundQuestion);
  } */
    fetchData();
  }, [id]);

  /*   if (!currentQuestion) {
    return <div>Loading...</div>; // Add a loading state while data is being fetched
  } */

  return (
    <Root>
      <QuestionForm
        id={id}
        currentQuestion={currentQuestion}
        updateViews={updateViews}
      />
    </Root>
  );
};
