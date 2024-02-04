import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '../../components';
import {
  HashtagIcon,
  QuestionForm,
  QuestionKeywordSection,
  QuestionTitleInput,
  QuestionTitleSection,
  QuestionTypo,
} from './styled';
import instance from 'api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { QuestionData } from '../../stores/page-store';
import type { QuestionDataType } from '../../stores/page-store';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import modules from '../../utils/quillModules';
import { TagsInput } from 'react-tag-input-component';
import { UserState } from 'stores/login-store';

export const ModifyQuestion = () => {
  const user = useRecoilValue(UserState);
  const QuillRef = useRef<ReactQuill | null>(null);
  const [contents, setContents] = useState('');
  const [modifiedArticle, setModifiedArticle] = useState<QuestionDataType | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const { _id } = useParams<{ _id: string }>();
  const token = useMemo(() => localStorage.getItem('token'), []);

  const navigate = useNavigate();

  const setQuestionData = useSetRecoilState(QuestionData); // Recoil setter

  const fetchArticleData = async () => {
    try {
      const response = await instance.get(`/api/articles/${_id}`);
      setModifiedArticle(response.data);
      setContents(response.data.content);
      setSelected(response.data.hashtags);

      if (user._id !== response.data.userId) {
        alert('본인의 글만 수정할 수 있습니다.');
        navigate(`/articles/${_id}`);
      }
    } catch (error) {
      console.error(error);
      setModifiedArticle(null);
      // alert('게시글 정보 가져오기 실패!');
    }
  };

  const updateQuestion = async () => {
    try {
      if (!modifiedArticle) {
        return;
      }
      if (modifiedArticle.title === '') {
        alert('제목을 입력해주세요.');
        return;
      }
      if (contents === '') {
        alert('내용을 입력해주세요.');
        return;
      }
      if (selected.length === 0) {
        alert('키워드를 입력해주세요.');
        return;
      }
      await instance.put(`/api/articles/${_id}`, modifiedArticle, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestionData((prevQuestionData: QuestionDataType[]) => {
        const updatedData = prevQuestionData.map(item =>
          item._id === _id ? { ...item, title: modifiedArticle.title, content: contents, hashtags: selected } : item,
        );
        return updatedData;
      });
      alert('수정되었습니다.');
      navigate(`/articles/${_id}`);
    } catch (error) {
      console.error(error);
      alert('질문 수정 실패!');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifiedArticle(
      prevState =>
        ({
          ...prevState,
          title: e.target.value,
        } as QuestionDataType | null),
    );
  };

  useEffect(() => {
    fetchArticleData();
    if (!token) {
      alert('로그인 후 이용해주세요!');
      return;
    }
  }, []);

  useEffect(() => {
    setModifiedArticle(prevState => ({ ...prevState, content: contents } as QuestionDataType | null));
  }, [contents]);

  useEffect(() => {
    if (selected.length > 3) {
      alert('키워드는 최대 3개까지 입력가능합니다');
      setSelected(selected.slice(0, 3));
    }
    setModifiedArticle(prevState => ({ ...prevState, hashtags: selected } as QuestionDataType | null));
  }, [selected]);

  return (
    <QuestionForm>
      <QuestionTitleSection>
        <QuestionTypo>Q</QuestionTypo>
        <QuestionTitleInput value={modifiedArticle?.title || ''} onChange={handleTitleChange} />
      </QuestionTitleSection>
      <ReactQuill
        ref={QuillRef}
        value={contents}
        onChange={setContents}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
      <QuestionKeywordSection>
        <HashtagIcon />
        <TagsInput value={selected} onChange={setSelected} name="hashtags" placeHolder="키워드를 입력해주세요." />
      </QuestionKeywordSection>
      <Button type="button" onClick={updateQuestion}>
        수정 완료
      </Button>
    </QuestionForm>
  );
};
