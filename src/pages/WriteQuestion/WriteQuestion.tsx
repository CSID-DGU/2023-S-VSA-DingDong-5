import { useEffect, useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '../../components';
import {
  HashtagIcon,
  KeywordInput,
  QuestionForm,
  QuestionKeywordSection,
  QuestionTitleInput,
  QuestionTitleSection,
  QuestionTypo,
} from './styled';
import instance from 'api/axios';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { QuestionData } from '../../stores/page-store';
import type { QuestionDataType } from '../../stores/page-store';
import modules from '../../utils/quillModules';
import { TagsInput } from 'react-tag-input-component';
import { stringify } from 'querystring';
import { UserState } from 'stores/login-store';

export const WriteQuestion = () => {
  const token = localStorage.getItem('token');
  const user = useRecoilValue(UserState);
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    userId: user._id,
    hashtags: selected,
    isDeleted: false,
  });
  const navigate = useNavigate();
  // const setQuestionData = useSetRecoilState(QuestionData); // Recoil setter

  const postQuestion = async () => {
    try {
      if (newArticle.title === '') {
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
      await instance
        .post('/api/articles/', newArticle, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          alert('질문이 등록되었습니다.');
          navigate(`/articles/${res.data._id}`);
          // navigate(`/articles`);
        });
    } catch (error) {
      console.error(error);
      if ((error as AxiosError).response!.status === 413) {
        alert('용량이 너무 큽니다.');
        return;
      }
      alert('질문 등록 실패!');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewArticle({ ...newArticle, title: e.target.value });
  };

  const handleTagsChange = (newTags: string[]) => {
    // 글자수 제한을 6으로 가정
    const maxLength = 6;
    const validTags = newTags.filter(tag => {
      if (tag.length > maxLength) {
        alert(`키워드는 ${maxLength}자 이내로 입력해주세요.`);
        return false;
      }
      return tag.length <= maxLength;
    });
    setSelected(validTags);
  };

  useEffect(() => {
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/signin');
      return;
    }
  }, []);

  useEffect(() => {
    // console.log(contents);
    setNewArticle({
      ...newArticle,
      content: contents,
      /*,hashtags: {...selected} */
    });
  }, [contents]);

  // selected 배열의 길이를 3으로 제한
  useEffect(() => {
    if (selected.length > 3) {
      alert('키워드는 최대 3개까지 입력가능합니다');
      setSelected(selected.slice(0, 3));
    }
    setNewArticle({ ...newArticle, hashtags: selected });
  }, [selected]);

  return (
    <QuestionForm>
      <QuestionTitleSection>
        <QuestionTypo>Q</QuestionTypo>
        <QuestionTitleInput
          placeholder="질문 내용을 명확하게 요약하여 작성해주세요."
          value={newArticle.title}
          onChange={handleTitleChange}
        />
      </QuestionTitleSection>
      <ReactQuill
        ref={element => {
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
      {/* </QuestionContentSection> */}
      <QuestionKeywordSection>
        <HashtagIcon />
        <TagsInput value={selected} onChange={handleTagsChange} name="hashtags" placeHolder="키워드를 입력해주세요." />
      </QuestionKeywordSection>
      <Button type="button" onClick={postQuestion}>
        질문작성
      </Button>
    </QuestionForm>
  );
};
