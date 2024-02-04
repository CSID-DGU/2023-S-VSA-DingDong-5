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
import instance from 'api/axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { PageState } from '../../stores/link-store';
import { HashTagNav } from '..';

type QuestionRowProps = {
  item: QuestionDataType;
};

export const QuestionRow = ({ item }: QuestionRowProps) => {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useRecoilState(PageState);

  const HashtagNav = (item: string) => {
    navigate(`/search/hashtag?hashtag=${encodeURIComponent(item)}`);
    setSelectedNav(`/search`);
  };

  const isValidQuestion = async (e: React.MouseEvent<HTMLAnchorElement>, questionId: any) => {
    e.preventDefault();
    const response = await instance.get(`/api/articles/valid/${questionId}`);
    if (!response.data.isValid) {
      alert('삭제된 질문입니다');
    } else {
      navigate(`/articles/${questionId}`);
    }
  };

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
            <Link to={`/articles/${item._id}`} onClick={event => isValidQuestion(event, item._id)}>
              {item.title}
            </Link>
          </Title>
          <Addition>
            <HashTagWrapper>
              {item.hashtags?.map(content => (
                <HashTag key={content} onClick={() => HashtagNav(content)}>
                  {content}
                </HashTag>
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
