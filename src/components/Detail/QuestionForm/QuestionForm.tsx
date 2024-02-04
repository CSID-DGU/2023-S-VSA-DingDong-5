import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  HeartIcon,
  ItemContainer,
  ItemTypo,
  BodySection,
  Title,
  TitleSection,
  TopContainer,
  QTypo,
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
  HashTagContainer,
  HashTag,
} from './styled';
import DOMPurify from 'dompurify';
import instance from 'api/axios';
import { AxiosError } from 'axios';
import type { QuestionDataType } from '../../../stores/page-store';
import { CommentForm } from '../CommentForm';
import { useRecoilValue } from 'recoil';
import { LoginState, UserState } from 'stores/login-store';

type Props = {
  _id?: string | null;
};

export const QuestionForm: React.FC<Props> = ({ _id }) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionDataType | null>(null); // Change initial state to null
  const [isVoted, setIsVoted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const isLogin = useRecoilValue(LoginState);
  const user = useRecoilValue(UserState);
  const token = useMemo(() => localStorage.getItem('token'), []);

  const navigate = useNavigate();

  const fetchQuestionData = useCallback(async () => {
    try {
      const response = await instance.get(`/api/articles/${_id}`);
      const foundQuestion = response.data;

      if (isLogin) {
        const voteResponse = await instance.get(`/api/articles/${_id}/isVoted`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const saveResponse = await instance.get(`/api/articles/${_id}/isBookmarked`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsVoted(voteResponse.data);
        setIsSaved(saveResponse.data);
      }
      if (foundQuestion) {
        setCurrentQuestion(foundQuestion);
      }
    } catch (error) {
      console.error('질문 불러오기 실패 : ' + error);
      // alert('질문 불러오기 실패!');
    }
  }, [_id]);

  const updateViews = async () => {
    try {
      await instance.put(`/api/articles/${_id}/view`);
      fetchQuestionData();
    } catch (error) {
      console.error('Error updating views:', error);
    }
  };

  const deleteQuestion = async () => {
    if (!token) {
      alert('로그인 후 이용해주세요!');
      return;
    }

    try {
      //삭제할건지 확인
      if (!window.confirm('정말 삭제하시겠습니까?')) {
        return;
      }
      //삭제
      await instance
        .put(`/api/articles/${_id}/delete`, null, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert('질문 삭제 성공!');
          navigate('/articles');
        });
    } catch (error) {
      console.error(error);
      // TODO : access denied 일 경우 다른 알림
      alert('질문 삭제 실패!');
    }
  };

  // 투표수 업데이트
  const handleVote = async () => {
    if (!token) {
      alert('로그인 후 이용해주세요!');
      return;
    }
    try {
      const response = await instance.put(`/api/articles/${_id}/vote`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const isVoted = response.data;
      setIsVoted(isVoted);
      fetchQuestionData();
    } catch (error) {
      console.error('Error updating votes:', error);
      if ((error as AxiosError).response!.status === 403) {
        alert('본인의 글은 투표할 수 없습니다.');
        return;
      }
      alert('투표 실패!');
    }
  };

  // 저장수 업데이트
  const handleSave = async () => {
    if (!token) {
      alert('로그인 후 이용해주세요!');
      return;
    }

    try {
      const response = await instance.put(`/api/articles/${_id}/bookmark`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const isSaved = response.data;
      setIsSaved(isSaved);
      fetchQuestionData();
    } catch (error) {
      console.error('Error updating saves:', error);
      if ((error as AxiosError).response!.status === 403) {
        alert('본인의 글은 저장할 수 없습니다.');
        return;
      }
      alert('저장 실패!');
    }
  };

  useEffect(() => {
    fetchQuestionData();
    updateViews();
  }, []);

  return (
    <>
      <TitleSection>
        <QTypo>Q</QTypo>
        <Title>{currentQuestion?.title}</Title>
      </TitleSection>
      <BodySection>
        <TopContainer>
          <ItemContainer>
            {/* 투표 */}
            {isVoted ? <HeartFillIcon onClick={handleVote} /> : <HeartIcon onClick={handleVote} />}
            <ItemTypo>{currentQuestion?.votes}</ItemTypo>
            {/* 저장 */}
            {isSaved ? <SaveFillIcon onClick={handleSave} /> : <SaveIcon onClick={handleSave} />}
            <ItemTypo>{currentQuestion?.saves}</ItemTypo>
          </ItemContainer>
          <ItemContainer>
            <ViewDateContainer>
              <Typo>조회수 {currentQuestion?.views}</Typo>
              <Typo>{currentQuestion?.createdAt}</Typo>
            </ViewDateContainer>
            <ContentTypo
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(currentQuestion?.content as string),
              }}
            />
          </ItemContainer>
        </TopContainer>
        <BottomContainer>
          <BottomLeftContainer>
            <HashTagContainer>
              {currentQuestion?.hashtags.map((hashtag, index) => (
                <HashTag key={index}>{hashtag}</HashTag>
              ))}
            </HashTagContainer>
            {user._id === currentQuestion?.userId && (
              <Typo underline="true" pointer="true" onClick={() => navigate(`/articles/modify/${_id}`)}>
                수정
              </Typo>
            )}
            {user._id === currentQuestion?.userId && (
              <Typo underline="true" pointer="true" onClick={deleteQuestion}>
                삭제
              </Typo>
            )}
          </BottomLeftContainer>
          <BottomRightContainer>
            <AuthorBox>
              <AskedTypo>Asked</AskedTypo>
              <AuthorContainer>
                <AuthorProfile>{currentQuestion?.author}</AuthorProfile>
                <UserStateCircle color={currentQuestion?.votes! < 15 ? '#D1D5DB' : '#ffd700'} />
                <Typo>{currentQuestion?.votes}</Typo>
              </AuthorContainer>
            </AuthorBox>
          </BottomRightContainer>
        </BottomContainer>
        <CommentForm _id={_id} selected="articles" />
      </BodySection>
    </>
  );
};
