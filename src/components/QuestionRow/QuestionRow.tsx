import React from 'react';
import {
  TableCell,
  TableRow,
  Info,
  Box,
  Div,
  Span,
  Context,
  Title,
  Addition,
  HashTagWrapper,
  HashTag,
  Author,
  Date,
  PurpleBox,
  PurpleDiv,
  PurpleSpan,
} from './styled';
import { Link } from 'react-router-dom';
import { QuestionDataType } from 'stores/page-store';
import axios from 'axios';

type QuestionRowProps = {
  item: QuestionDataType;
};

export const QuestionRow = ({ item }: QuestionRowProps) => {
  // const isValidQuestion = async (e: React.MouseEvent<HTMLAnchorElement>, questionId: any) => {
  //   e.preventDefault();
  //   const validResponse = await axios.get(`/api/articles/valid/${questionId}`);
  //   if (!validResponse.data.isValid) {
  //     alert('삭제된 질문입니다');
  //   }
  // };

  return (
    <TableRow key={item._id}>
      <TableCell>
        <Info>
          <Box>
            <Div>{item.votes}</Div>
            <Span>투표수</Span>
          </Box>
          {item.answers === 0 ? (
            <Box>
              <Div>{item.answers}</Div>
              <Span>답변수</Span>
            </Box>
          ) : (
            <PurpleBox>
              <PurpleDiv>{item.answers}</PurpleDiv>
              <PurpleSpan>답변수</PurpleSpan>
            </PurpleBox>
          )}
          <Box>
            <Div>{item.views}</Div>
            <Span>조회수</Span>
          </Box>
        </Info>
        <Context>
          <Title>
            {item.isDeleted ? (
              <Link to={`/articles/${item._id}/bookmark`}>{item.title}</Link>
            ) : (
              <Link to={`/articles/${item._id}`}>{item.title}</Link>
            )}
          </Title>
          <Addition>
            <HashTagWrapper>
              {item.hashtags?.map(content => (
                <HashTag key={content}>{content}</HashTag>
              ))}
            </HashTagWrapper>
            <Author>{item.author}</Author>
            <Date>{item.createdAt}</Date>
          </Addition>
        </Context>
      </TableCell>
    </TableRow>
  );
};
