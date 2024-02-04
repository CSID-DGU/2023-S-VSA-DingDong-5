import { Button } from 'components';
import {
  SaveIcon,
  Container,
  Input,
  HeartFillIcon,
  HeartIcon,
  ItemContainer,
  ItemTypo,
  Typo,
  ContentContainer,
  InfoContainer,
  Root,
  SaveFillIcon,
  ButtonContainer,
} from './styled';
import { useState, useEffect, useMemo } from 'react';
import instance from 'api/axios';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { LoginState, UserState } from 'stores/login-store';

type Props = {
  _id?: string | null;
  selected: string;
};

type Comment = {
  _id: string;
  questionId?: string;
  answerId?: string;
  userId: string;
  author?: string;
  content: string;
  votes?: number;
  saves?: number;
  isVoted: boolean;
  isSaved: boolean;
  createdAt: string;
  updatedAt: string;
};

export const CommentForm: React.FC<Props> = ({ _id, selected }) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ content: '' });
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // 수정중인 댓글의 id
  const isLogin = useRecoilValue(LoginState);
  const user = useRecoilValue(UserState);
  const token = useMemo(() => localStorage.getItem('token'), []);

  const fetchCommentList = async () => {
    try {
      const model = selected === 'articles' ? 'question' : 'answer';
      if (isLogin) {
        const response = await instance.get(`/api/comment?${model}Id=${_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          setCommentList(response.data);
        }
      } else {
        const response = await instance.get(`/api/comment/all/public?${model}Id=${_id}`);
        if (response.data) {
          setCommentList(response.data);
        }
      }
    } catch (error) {
      console.error('댓글 정보 가져오기 실패 :', error); // "Error fetching comment's data: Error: Request failed with status code 401
      setCommentList([]);
    }
  };

  const onChangeCommentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment({
      ...newComment,
      content: e.target.value,
    });
  };

  const onSubmitComment = async () => {
    if (!token) {
      alert('로그인 후 이용해주세요!');
      return;
    }
    if (!newComment.content) {
      alert('댓글을 입력해주세요.');
      return;
    }
    try {
      if (editingCommentId) {
        await instance.put(`/api/comment/${editingCommentId}`, newComment, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingCommentId(null);
        setNewComment({ content: '' });
        fetchCommentList();
        return;
      }
      await instance.put(`/api/${selected}/${_id}/comment`, newComment, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCommentList();
      setNewComment({ content: '' });
    } catch (error) {
      if ((error as AxiosError).response!.status === 401) {
        alert('자신의 댓글만 수정할 수 있습니다.');
      }
      console.error('Error posting comment:', error);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  const onClickCommentDelete = async (commentId: string) => {
    if (!token) {
      alert('로그인 후 이용해주세요!');
      return;
    }
    try {
      if (!window.confirm('정말 삭제하시겠습니까?')) return;
      await instance.delete(`/api/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      if ((error as AxiosError).response!.status === 401) {
        alert('자신의 댓글만 삭제할 수 있습니다.');
      }
      console.error("Error deleting comment's data:", error);
      alert('댓글 삭제에 실패했습니다.');
    }
    fetchCommentList();
  };

  const onClickCommentEdit = async (commentId: string) => {
    const editingComment = commentList.find(comment => comment._id === commentId);
    if (!editingComment) return;
    setNewComment(editingComment);
    setEditingCommentId(commentId);
  };

  const onClickCommentVote = async (commentId: string) => {
    if (!token) {
      alert('로그인 후 이용해주세요!');
      return;
    }
    try {
      const answerResponse = await instance.get(`/api/comment/${commentId}`);
      const answerToUpdate = answerResponse.data;
      if (!answerToUpdate) return;

      await instance.put(`/api/comment/${commentId}/vote`, null, {
        headers: { Authorization: `Bearer ${token}` },
        ...answerToUpdate,
      });
      fetchCommentList();
    } catch (error) {
      if ((error as AxiosError).response!.status === 401) {
        alert('자신의 댓글은 투표할 수 없습니다.');
        return;
      }
      console.error('Error updating votes:', error);
      alert('투표 실패!');
    }
  };

  const onClickCommentSave = async (commentId: string) => {
    if (!token) {
      alert('로그인 후 이용해주세요!');
      return;
    }
    try {
      const answerResponse = await instance.get<Comment>(`/api/comment/${commentId}`);
      const answerToUpdate = answerResponse.data;
      if (!answerToUpdate) return;

      await instance.put(`/api/comment/${commentId}/bookmark`, null, {
        headers: { Authorization: `Bearer ${token}` },
        ...answerToUpdate,
      });
      fetchCommentList();
    } catch (error) {
      if ((error as AxiosError).response!.status === 401) {
        alert('자신의 댓글은 저장할 수 없습니다.');
        return;
      }
      console.error('Error updating saves:', error);
      alert('저장 실패!');
    }
  };

  const onClickEditingCancel = () => {
    setEditingCommentId(null);
    setNewComment({ content: '' });
  };

  useEffect(() => {
    fetchCommentList();
  }, []);

  return (
    <Root>
      {commentList?.map(comment => (
        <Container key={comment._id}>
          <ItemContainer left="10px" right="8px">
            {comment.isVoted ? (
              <HeartFillIcon onClick={() => onClickCommentVote(comment._id)} />
            ) : (
              <HeartIcon onClick={() => onClickCommentVote(comment._id)} />
            )}
            <ItemTypo>{comment.votes}</ItemTypo>
          </ItemContainer>
          <ItemContainer right="10px">
            {comment.isSaved ? (
              <SaveFillIcon onClick={() => onClickCommentSave(comment._id)} top="1px" bottom="2px" />
            ) : (
              <SaveIcon onClick={() => onClickCommentSave(comment._id)} top="1px" bottom="2px" />
            )}
            <ItemTypo>{comment.saves}</ItemTypo>
          </ItemContainer>
          <ContentContainer>
            <Typo color="black">{comment?.content}</Typo>
            <InfoContainer>
              <Typo size="12px">{comment?.author}</Typo>
              <Typo size="12px">{comment?.updatedAt || comment?.createdAt}</Typo>
              {user._id === comment.userId && (
                <Typo onClick={() => onClickCommentEdit(comment._id!)} pointer="true" underline="true" size="12px">
                  수정
                </Typo>
              )}
              {user._id === comment.userId && (
                <Typo onClick={() => onClickCommentDelete(comment._id!)} pointer="true" underline="true" size="12px">
                  삭제
                </Typo>
              )}
            </InfoContainer>
          </ContentContainer>
        </Container>
      ))}
      {isLogin && <Input placeholder="댓글을 입력하세요" value={newComment.content} onChange={onChangeCommentInput} />}
      {isLogin && (
        <ButtonContainer>
          <Button onClick={onSubmitComment} width="88px" height="38px" fontsize="15px" top="5px" borderradius="8px">
            {editingCommentId ? '댓글수정' : '댓글작성'}
          </Button>
          {editingCommentId && (
            <Button
              onClick={onClickEditingCancel}
              width="58px"
              height="38px"
              fontsize="15px"
              top="5px"
              left="2px"
              borderradius="8px">
              취소
            </Button>
          )}
        </ButtonContainer>
      )}
    </Root>
  );
};
