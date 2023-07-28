import { useEffect, useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "../../components/Button";
import {
  HashtagIcon,
  KeywordInput,
  QuestionForm,
  QuestionKeywordSection,
  QuestionTitleInput,
  QuestionTitleSection,
  QuestionTypo,
} from "./styled";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { QuestionData } from "../../stores/page-store";
import type { QuestionDataType } from "../../stores/page-store";
import { useSetRecoilState } from "recoil";

export const ModifyQuestion = () => {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState("");
  const [modifiedArticle, setModifiedArticle] =
    useState<QuestionDataType | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const setQuestionData = useSetRecoilState(QuestionData); // Recoil setter

  const fetchArticleData = async () => {
    try {
      const response = await axios.get(`/api/articles/${id}`);
      setModifiedArticle(response.data);
      setContents(response.data.content);
    } catch (error) {
      console.error(error);
      alert("게시글 정보 가져오기 실패!");
    }
  };

  useEffect(() => {
    fetchArticleData();
  }, [id]);

  const updateQuestion = async () => {
    try {
      if (!modifiedArticle) {
        return;
      }
      if (modifiedArticle.title === "" || contents === "") {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }
      await axios.put(`/api/articles/${id}`, {
        ...modifiedArticle,
        _id: id, // Ensure _id is included in the payload for the backend update
        content: contents,
      });
      setQuestionData((prevQuestionData: QuestionDataType[]) => {
        const updatedData = prevQuestionData.map((item) =>
          item._id === id
            ? { ...item, title: modifiedArticle.title, content: contents }
            : item
        );
        return updatedData;
      });
      alert("질문 수정 성공!");
      navigate(`/articles/${id}`);
    } catch (error) {
      console.error(error);
      alert("질문 수정 실패!");
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifiedArticle(
      (prevState) =>
        ({
          ...prevState,
          title: e.target.value,
        } as QuestionDataType | null)
    );
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }],
          ["image", "video", "link"],
        ],
        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true,
        },
      },
    }),
    []
  );

  useEffect(() => {
    setModifiedArticle(
      (prevState) =>
        ({ ...prevState, content: contents } as QuestionDataType | null)
    );
  }, [contents]);

  return (
    <QuestionForm>
      <QuestionTitleSection>
        <QuestionTypo>Q</QuestionTypo>
        <QuestionTitleInput
          value={modifiedArticle?.title || ""}
          onChange={handleTitleChange}
        />
      </QuestionTitleSection>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={contents}
        onChange={setContents}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
      <QuestionKeywordSection>
        <HashtagIcon />
        <KeywordInput placeholder="질문 내용의 키워드를 선택해주세요." />
      </QuestionKeywordSection>
      <Button alignself="flex-end" type="button" onClick={updateQuestion}>
        수정 완료
      </Button>
    </QuestionForm>
  );
};
