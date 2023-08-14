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
} from './styled';
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

type Props = {
  _id?: string | null;
  selected: string;
};

type Comment = {
  _id?: string;
  questionId?: string;
  answerId?: string;
  userId: string;
  author?: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};

export const CommentForm: React.FC<Props> = ({ _id, selected }) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<Comment>({ userId: '64cf545ec07a5fb842cb5016', content: '' });
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // 수정중인 댓글의 id

  const fetchCommentList = async () => {
    const response = await axios.get(`/api/comment?${selected === 'articles' ? 'question' : 'answer'}Id=${_id}`);
    setCommentList(response.data);
  };

  const onChangeCommentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment({
      ...newComment,
      content: e.target.value,
    });
  };

  const onSubmitComment = async () => {
    if (!newComment.content) {
      alert('댓글을 입력해주세요.');
      return;
    }
    try {
      if (editingCommentId) {
        await axios.put(`/api/comment/${editingCommentId}`, newComment);
        setEditingCommentId(null);
        setNewComment({ userId: '64cf545ec07a5fb842cb5016', content: '' });
        fetchCommentList();
        return;
      }
      await axios.put(`/api/${selected}/${_id}/comment`, newComment);
      fetchCommentList();
      setNewComment({ userId: '64cf545ec07a5fb842cb5016', content: '' });
    } catch (error) {
      console.error(error);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  const onClickCommentDelete = async (commentId: string) => {
    try {
      await axios.delete(`/api/comment/${commentId}`, {
        data: {
          userId: '64cf545ec07a5fb842cb5016', //임시
        },
      });

      // 정말로 삭제하시겠습니까? 확인창 띄우기
      const confirm = window.confirm('정말로 삭제하시겠습니까?');
      if (confirm) {
        alert('삭제되었습니다.');
      }
    } catch (error) {
      if ((error as AxiosError).response!.status === 401) {
        alert('자신의 댓글만 삭제할 수 있습니다.');
      }
    }
    fetchCommentList();
  };

  const onClickCommentEdit = async (commentId: string) => {
    const editingComment = commentList.find(comment => comment._id === commentId);
    if (!editingComment) return;
    setNewComment(editingComment);
    setEditingCommentId(commentId);
  };

  useEffect(() => {
    fetchCommentList();
  }, []);

  return (
    <Root>
      {commentList.map(comment => (
        <Container key={comment._id}>
          <ItemContainer left="10px" right="8px">
            <HeartIcon />
            <ItemTypo>0</ItemTypo>
          </ItemContainer>
          <ItemContainer right="10px">
            <SaveIcon top="1px" bottom="2px" />
            <ItemTypo>0</ItemTypo>
          </ItemContainer>
          <ContentContainer>
            <Typo color="black">{comment?.content}</Typo>
            <InfoContainer>
              <Typo size="12px">{comment?.author}</Typo>
              <Typo size="12px">{comment?.updatedAt || comment?.createdAt}</Typo>
              <Typo pointer="true" underline="true" size="12px">
                공유
              </Typo>
              <Typo onClick={() => onClickCommentEdit(comment._id!)} pointer="true" underline="true" size="12px">
                수정
              </Typo>
              <Typo onClick={() => onClickCommentDelete(comment._id!)} pointer="true" underline="true" size="12px">
                삭제
              </Typo>
            </InfoContainer>
          </ContentContainer>
        </Container>
      ))}
      <Input placeholder="댓글을 입력하세요" value={newComment.content} onChange={onChangeCommentInput} />
      <Button onClick={onSubmitComment} top="5px">
        {editingCommentId ? '댓글수정' : '댓글달기'}
      </Button>
    </Root>
  );
};
