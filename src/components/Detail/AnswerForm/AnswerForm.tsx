import { useState, useEffect, useRef, useMemo } from 'react';
import React from 'react';
import {
  HeartIcon,
  ItemContainer,
  ItemTypo,
  BodySection,
  Title,
  TitleSection,
  TopContainer,
  ATypo,
  SaveIcon,
  ContentTypo,
  BottomLeftContainer,
  BottomContainer,
  Typo,
  BottomRightContainer,
  AuthorBox,
  ViewDateContainer,
  AskedTypo,
  AuthorContainer,
  AuthorProfile,
  UserStateCircle,
  HeartFillIcon,
  SaveFillIcon,
} from './styled';
import DOMPurify from 'dompurify';
import axios, { AxiosError } from 'axios';
import { WriteAnswerForm } from '../WriteAnswerForm';
import { CommentForm } from '../CommentForm';
import { useRecoilValue } from 'recoil';
import { LoginState, UserState } from 'stores/login-store';
import { QuestionDataType } from 'stores/page-store';

interface AnswerDataType {
  _id: string;
  content: string;
  questionTitle: string;
  questionId: string;
  author: string;
  userId: string;
  votes: number;
  saves: number;
  comments: number;
  isVoted: boolean;
  isSaved: boolean;
  createdAt: string;
  updatedAt: string;
}

type Props = {
  _id?: string | null;
};

export const AnswerForm: React.FC<Props> = ({ _id }) => {
  const [contents, setContents] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState<QuestionDataType | null>(null);
  const [answerData, setAnswerData] = useState<AnswerDataType[]>([]);
  const [newAnswer, setNewAnswer] = useState({
    content: '',
  });
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const isLogin = useRecoilValue(LoginState);
  const user = useRecoilValue(UserState);
  const token = useMemo(() => localStorage.getItem('token'), []);

  // to get the reference of the Quill editor
  const writeAnswerFormRef = useRef<HTMLFormElement>(null);

  const fetchCurrentQuestion = async () => {
    try {
      const response = await axios.get(`/api/articles/${_id}`);
      const foundQuestion = response.data;
      if (foundQuestion) {
        if (foundQuestion.isDeleted) {
          const bookmarkedResponse = await axios.get(`/api/articles/${_id}/bookmark`);
          setCurrentQuestion(bookmarkedResponse.data);
        }
        setCurrentQuestion(foundQuestion);
      }
    } catch (error) {
      console.error('질문 정보 가져오기 실패 : ' + error);
      setCurrentQuestion(null);
    }
  };

  const fetchAnswerData = async () => {
    try {
      if (isLogin) {
        const answerResponse = await axios.get(`/api/answer/all/${_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (answerResponse.data) {
          setAnswerData(answerResponse.data);
        }
      } else {
        const answerResponse = await axios.get(`/api/answer/all/public/${_id}`);
        if (answerResponse.data) {
          setAnswerData(answerResponse.data);
        }
      }
    } catch (error) {
      console.error('댓글 정보 가져오기 실패 : ' + error);
      setAnswerData([]);
    }
  };

  const postAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (newAnswer.content === '') {
        alert('내용을 입력해주세요.');
        return;
      }

      if (editingAnswerId) {
        if (!token) {
          alert('로그인 후 이용해주세요!');
          return;
        }
        // If editingAnswerId is not null, it means we are editing an existing answer
        await axios
          .put(`/api/answer/${editingAnswerId}`, newAnswer, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(res => {
            alert('답변 수정 성공!');
            setContents('');
            setEditingAnswerId(null);
            fetchAnswerData();
          });
        return;
      }

      // Check if the current user has already posted an answer
      const hasPostedAnswer = answerData.some(answer => answer.userId === user._id);
      if (hasPostedAnswer) {
        alert('이미 답변을 작성했습니다.');
        return;
      }

      // If editingAnswerId is null, it means we are creating a new answer
      await axios
        .post(`/api/answer/${_id}`, newAnswer, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          alert('답변 등록 성공!');
          setContents('');
          fetchAnswerData();
        });
    } catch (error) {
      console.error(error);
      if ((error as AxiosError).response!.status === 413) {
        alert('용량이 너무 큽니다.');
        return;
      }
      if ((error as AxiosError).response && (error as AxiosError).response!.status === 401) {
        alert('자신이 작성한 글만 수정할 수 있습니다.'); // 401 Unauthorized 에러 시 알림
        return;
      }
      alert('답변 등록 실패!');
    }
  };

  // 특정 answer를 삭제하는 함수
  const deleteAnswer = async (answerId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인 후 이용해주세요!');
      return;
    }
    try {
      if (!window.confirm('정말 삭제하시겠습니까?')) return;
      await axios
        .delete(`/api/answer/${answerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          setAnswerData((prevAnswerData: AnswerDataType[]) => prevAnswerData.filter(item => item._id !== answerId));
          alert('답변 삭제 성공!');
        });
    } catch (error) {
      console.error(error);
      alert('답변 삭제 실패!');
    }
  };

  // Function to handle the editing of an answer
  const editAnswer = (answerId: string) => {
    // Find the answer to edit in the answerData array
    const editedAnswer = answerData.find(answer => answer._id === answerId);
    if (editedAnswer) {
      setContents(editedAnswer.content);
      setEditingAnswerId(answerId);

      if (writeAnswerFormRef.current) {
        writeAnswerFormRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Function to handle voting
  const handleVote = async (answerId: string) => {
    if (!token) {
      alert('로그인 후 이용해주세요!');
      return;
    }
    try {
      const answerResponse = await axios.get<AnswerDataType>(`/api/answer/${answerId}`);
      const answerToUpdate = answerResponse.data;
      if (!answerToUpdate) return;

      await axios.put(`/api/answer/${answerId}/vote`, null, {
        headers: { Authorization: `Bearer ${token}` },
        ...answerToUpdate,
      });
      fetchAnswerData();
    } catch (error) {
      if ((error as AxiosError).response!.status === 401) {
        alert('자신이 작성한 글은 투표할 수 없습니다.'); // 401 Unauthorized
        return;
      }
      console.error('Error updating votes:', error);
      alert('투표 실패!');
    }
  };

  // Function to handle saving
  const handleSave = async (answerId: string) => {
    if (!token) {
      alert('로그인 후 이용해주세요!');
      return;
    }
    try {
      const answerResponse = await axios.get<AnswerDataType>(`/api/answer/${answerId}`);
      const answerToUpdate = answerResponse.data;
      if (!answerToUpdate) return;

      await axios.put(`/api/answer/${answerId}/bookmark`, null, {
        headers: { Authorization: `Bearer ${token}` },
        ...answerToUpdate,
      });
      fetchAnswerData();
    } catch (error) {
      if ((error as AxiosError).response!.status === 401) {
        alert('자신이 작성한 글은 저장할 수 없습니다.'); // 401 Unauthorized
        return;
      }
      console.error('Error updating saves:', error);
      alert('저장 실패!');
    }
  };

  const onClickEditingCancel = () => {
    setContents('');
    setEditingAnswerId(null);
  };

  useEffect(() => {
    setNewAnswer({ ...newAnswer, content: contents });
  }, [contents]);

  useEffect(() => {
    fetchCurrentQuestion();
    fetchAnswerData();
  }, []);

  return (
    <>
      {answerData.length > 0 && (
        <TitleSection top="45px">
          <ATypo>A</ATypo>
          <Title>{answerData.length}개의 답변</Title>
        </TitleSection>
      )}
      {answerData?.map((answer, index) => (
        <BodySection key={answer._id}>
          <TopContainer>
            <ItemContainer>
              {/* 투표 */}
              {answer.isVoted ? (
                <HeartFillIcon onClick={() => handleVote(answer._id)} />
              ) : (
                <HeartIcon onClick={() => handleVote(answer._id)} />
              )}
              <ItemTypo>{answer.votes}</ItemTypo>
              {/* 저장 */}
              {answer.isSaved ? (
                <SaveFillIcon onClick={() => handleSave(answer._id)} />
              ) : (
                <SaveIcon onClick={() => handleSave(answer._id)} />
              )}
              <ItemTypo>{answer.saves}</ItemTypo>
            </ItemContainer>
            <ItemContainer>
              <ViewDateContainer>
                <Typo>{answer.createdAt}</Typo>
              </ViewDateContainer>
              <ContentTypo
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(answer.content as string),
                }}
              />
            </ItemContainer>
          </TopContainer>
          <BottomContainer>
            <BottomLeftContainer>
              {user._id === answer.userId && (
                <Typo underline="true" pointer="true" onClick={() => editAnswer(answer._id)}>
                  수정
                </Typo>
              )}
              {user._id === answer.userId && (
                <Typo underline="true" pointer="true" onClick={() => deleteAnswer(answer._id)}>
                  삭제
                </Typo>
              )}
            </BottomLeftContainer>
            <BottomRightContainer>
              <AuthorBox>
                <AskedTypo>Answered</AskedTypo>
                <AuthorContainer>
                  <AuthorProfile>{answer.author}</AuthorProfile>
                  <UserStateCircle color={answer.votes < 15 ? '#D1D5DB' : '#ffd700'} />
                  <Typo>{answer.votes}</Typo>
                </AuthorContainer>
              </AuthorBox>
            </BottomRightContainer>
          </BottomContainer>
          <CommentForm _id={answer._id} selected="answer" />
        </BodySection>
      ))}
      {isLogin && user._id !== currentQuestion?.userId && (
        <WriteAnswerForm
          ref={writeAnswerFormRef}
          contents={contents}
          onContentsChange={setContents}
          postAnswer={postAnswer}
          editingAnswerId={editingAnswerId}
          onClickEditingCancel={onClickEditingCancel}
        />
      )}
    </>
  );
};
