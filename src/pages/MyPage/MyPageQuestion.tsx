import { Table, Tbody, Title, Typo } from './styled';
import { Loading, QuestionRow } from 'components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import instance from 'api/axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { QuestionData, QuestionDataType } from 'stores/page-store';
import { Pagination } from 'components/List/Pagination';

export const MyPageQuestion = () => {
  const [page, setPage] = useState<number>(1);
  const [questionData, setQuestionData] = useState<QuestionDataType[]>([]);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const itemsPerPage = 5;

  const token = useMemo(() => localStorage.getItem('token'), []);

  const location = useLocation();
  const path = location.pathname;

  const getMyQuestion = async () => {
    const response = await instance.get(`/api/mypage/questions?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTotalQuestions(response.data.totalQuestions);
    console.log(response.data.totalQuestions);

    const updatedQuestions = response.data.updatedQuestions;
    setQuestionData(updatedQuestions);
    setIsLoading(true);
  };

  const getBookmarkQuestion = async () => {
    const response = await instance.get(`/api/mypage/bookmarks/questions?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTotalQuestions(response.data.totalQuestions);

    const updatedQuestions = response.data.updatedQuestions;
    setQuestionData(updatedQuestions);
    setIsLoading(true);
  };

  const handlePaginationChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (path === '/mypage') {
      getMyQuestion();
    }
    if (path === '/mypage/bookmarks/questions') {
      getBookmarkQuestion();
    }
  }, [location, page]);

  return (
    <>
      <Title>{path === '/mypage' ? '작성한 질문' : '저장한 질문'}</Title>
      {isLoading ? (
        <Table>
          <Tbody>
            {questionData?.length > 0 ? (
              questionData?.map((item: QuestionDataType) => <QuestionRow key={item._id} item={item} />)
            ) : (
              <Typo>{path === '/mypage' ? '작성한' : '저장한'}&nbsp;질문이 없습니다.</Typo>
            )}
          </Tbody>
        </Table>
      ) : (
        <Loading />
      )}
      <Pagination
        page={page}
        QuestionData={questionData}
        totalQuestions={totalQuestions}
        itemsPerPage={itemsPerPage}
        handlePaginationChange={handlePaginationChange}
      />
    </>
  );
};
