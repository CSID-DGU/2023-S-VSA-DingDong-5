import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  HeartIcon,
  ItemContainer,
  ItemTypo,
  QuestionBodySection,
  QuestionTitle,
  QuestionTitleSection,
  QuestionTopContainer,
  QuestionTypo,
  SaveIcon,
  ContentTypo,
  QuestionBottomLeftContainer,
  QuestionBottomContainer,
  Typo,
  QuestionBottomRightContainer,
  AuthorBox,
  ViewDateContainer,
  AskedTypo,
  AuthorContainer,
  AuthorProfile,
  UserStateCircle,
  CommentContainer,
  HeartFillIcon,
} from "../QuestionForm/styled";
import DOMPurify from "dompurify";
import axios from "axios";
import { WriteAnswerForm } from "../WriteAnswerForm";

interface AnswerDataType {
  _id: string;
  content: string;
  questionTitle: string;
  questionId: string;
  author: string;
  votes: number;
  saves: number;
  createdAt: string;
  updatedAt: string;
}

type Props = {
  _id?: string | null;
};

export const AnswerForm: React.FC<Props> = ({ _id }) => {
  // 답변 내용
  const [contents, setContents] = useState("");
  // 답변게시글 배열
  const [answerData, setAnswerData] = useState<AnswerDataType[]>([]);
  // State to keep track of the new answer being created
  const [newAnswer, setNewAnswer] = useState({
    content: "",
    questionTitle: "",
    questionId: _id,
    author: "min",
    votes: 0,
    saves: 0,
  });
  // State to keep track of the answer being edited
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);

  // to get the reference of the Quill editor
  const writeAnswerFormRef = useRef<HTMLFormElement>(null);

  const postAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (newAnswer.content === "") {
        alert("내용을 입력해주세요.");
        return;
      }

      if (editingAnswerId) {
        // If editingAnswerId is not null, it means we are editing an existing answer
        await axios
          .put(`/api/answer/${editingAnswerId}`, {
            ...newAnswer,
            content: contents,
          })
          .then((res) => {
            // Update the answerData array with the updated answer
            setAnswerData((prevAnswerData: AnswerDataType[]) =>
              prevAnswerData.map((item) =>
                item._id === editingAnswerId ? res.data : item
              )
            );
            alert("답변 수정 성공!");
            setContents("");
            setEditingAnswerId(null);
          });
      } else {
        // If editingAnswerId is null, it means we are creating a new answer
        await axios.post(`/api/answer/${_id}`, newAnswer).then((res) => {
          setAnswerData((prevAnswerData: AnswerDataType[]) => [
            ...prevAnswerData,
            res.data,
          ]);
          alert("답변 등록 성공!");
          setContents("");
        });
      }
    } catch (error) {
      console.error(error);
      alert("답변 등록 또는 수정 실패!");
    }
  };

  // 특정 answer를 삭제하는 함수
  const deleteAnswer = async (answerId: string) => {
    try {
      await axios.delete(`/api/answer/${answerId}`).then((res) => {
        setAnswerData((prevAnswerData: AnswerDataType[]) =>
          prevAnswerData.filter((item) => item._id !== answerId)
        );
        alert("답변 삭제 성공!");
      });
    } catch (error) {
      console.error(error);
      alert("답변 삭제 실패!");
    }
  };

  // Function to handle the editing of an answer
  const editAnswer = (answerId: string) => {
    // Find the answer to edit in the answerData array
    const editedAnswer = answerData.find((answer) => answer._id === answerId);
    if (editedAnswer) {
      setContents(editedAnswer.content);
      setEditingAnswerId(answerId);

      if (writeAnswerFormRef.current) {
        writeAnswerFormRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const fetchAnswerData = async () => {
    try {
      const answerResponse = await axios.get(`/api/answer/all/${_id}`);
      const foundAnswer = answerResponse.data;
      if (foundAnswer) {
        setAnswerData(foundAnswer);
      }
    } catch (error) {
      console.error(error);
      alert("답변 정보 가져오기 실패!");
    }
  };

  useEffect(() => {
    setNewAnswer({ ...newAnswer, content: contents });
  }, [contents]);

  useEffect(() => {
    fetchAnswerData();
  }, []);

  return (
    <>
      {answerData.length > 0 && (
        <QuestionTitleSection top="45px">
          <QuestionTypo>A</QuestionTypo>
          <QuestionTitle style={{ color: "#525458" }}>
            {answerData.length}개의 답변
          </QuestionTitle>
        </QuestionTitleSection>
      )}
      {answerData?.map((answer, index) => (
        <QuestionBodySection key={`${answer.questionId}_${index}`}>
          <QuestionTopContainer>
            <ItemContainer>
              <HeartIcon />
              <ItemTypo>{answer.votes}</ItemTypo>
              <SaveIcon />
              <ItemTypo>{answer.saves}</ItemTypo>
            </ItemContainer>
            <ItemContainer>
              <ViewDateContainer>
                {/* <Typo>조회수 {currentQuestion?.views}</Typo> */}
                <Typo>{answer.createdAt}</Typo>
              </ViewDateContainer>
              <ContentTypo
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(answer.content as string),
                }}
              />
            </ItemContainer>
          </QuestionTopContainer>
          <QuestionBottomContainer>
            <QuestionBottomLeftContainer>
              <Typo underline="true" pointer="true">
                공유
              </Typo>
              <Typo
                underline="true"
                pointer="true"
                onClick={() => editAnswer(answer._id)}
              >
                수정
              </Typo>
              <Typo
                underline="true"
                pointer="true"
                onClick={() => deleteAnswer(answer._id)}
              >
                삭제
              </Typo>
            </QuestionBottomLeftContainer>
            <QuestionBottomRightContainer>
              <AuthorBox>
                <AskedTypo>Answered</AskedTypo>
                <AuthorContainer>
                  <AuthorProfile>{answer.author}</AuthorProfile>
                  <UserStateCircle color="#ffd700" />
                  <Typo>{answer.votes}</Typo>
                </AuthorContainer>
              </AuthorBox>
            </QuestionBottomRightContainer>
          </QuestionBottomContainer>
        </QuestionBodySection>
      ))}
      <WriteAnswerForm
        ref={writeAnswerFormRef}
        contents={contents}
        onContentsChange={setContents}
        postAnswer={postAnswer}
        editingAnswerId={editingAnswerId}
      />
    </>
  );
};