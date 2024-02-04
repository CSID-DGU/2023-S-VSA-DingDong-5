import React, { useState, useEffect, Fragment } from 'react';
import instance from 'api/axios';
// import { allArticles } from "../../../api/url";
import { useRecoilState, useRecoilValue } from 'recoil';
import { QuestionListState } from '../../../stores/page-store';
import type { QuestionDataType } from '../../../stores/page-store';
import { Link } from 'react-router-dom';
import { Table, Tbody } from './styled';
import { Pagination } from '../Pagination';
import { QuestionRow, Loading } from 'components';

type Props = {
  selectedOrder: {
    latest: boolean;
    view: boolean;
    vote: boolean;
  };
};

export const ArticlesTable: React.FC<Props> = ({ selectedOrder }) => {
  const [page, setPage] = useState<number>(1);
  const [QuestionData, setQuestionData] = useState<QuestionDataType[]>([]);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const itemsPerPage = 5;

  const fetchLatestQuestionData = async (page: number) => {
    try {
      const response = await instance.get(`/api/articles?page=${page}`);
      // setPage(response.data.page);
      // setQuestionData(response.data.updatedQuestions);
      setTotalQuestions(response.data.totalQuestions);

      const updatedQuestions = response.data.updatedQuestions;
      setQuestionData(updatedQuestions);
      setIsLoading(true);
    } catch (error) {
      console.error(error);
      setQuestionData([]);
      // alert('게시판 정보 가져오기 실패!');
    }
  };

  const fetchViewQuestionData = async (page: number) => {
    try {
      const response = await instance.get(`/api/articles/popular?page=${page}`);
      setTotalQuestions(response.data.totalQuestions);

      const updatedQuestions = response.data.updatedQuestions;
      setQuestionData(updatedQuestions);
      setIsLoading(true);
    } catch (error) {
      console.error(error);
      setQuestionData([]);
      // alert('게시판 정보 가져오기 실패!');
    }
  };

  const fetchVoteQuestionData = async (page: number) => {
    try {
      const response = await instance.get(`/api/articles/interest?page=${page}`);
      setTotalQuestions(response.data.totalQuestions);

      const updatedQuestions = response.data.updatedQuestions;
      setQuestionData(updatedQuestions);
      setIsLoading(true);
    } catch (error) {
      console.error(error);
      setQuestionData([]);
      // alert('게시판 정보 가져오기 실패!');
    }
  };

  //데이터 가져오기
  useEffect(() => {
    if (selectedOrder.latest) {
      fetchLatestQuestionData(page);
    }
    if (selectedOrder.view) {
      fetchViewQuestionData(page);
    }
    if (selectedOrder.vote) {
      fetchVoteQuestionData(page);
    }
  }, [page, selectedOrder]);

  // selectedOrder가 변경되면 page를 1로 초기화
  useEffect(() => {
    setPage(1);
  }, [selectedOrder]);

  const handlePaginationChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      {isLoading ? (
        <Table>
          <Tbody>
            {QuestionData?.map((question, idx) => (
              <QuestionRow key={idx} item={question} />
            ))}
          </Tbody>
        </Table>
      ) : (
        <Loading />
      )}
      <Pagination
        page={page}
        QuestionData={QuestionData}
        totalQuestions={totalQuestions}
        itemsPerPage={itemsPerPage}
        handlePaginationChange={handlePaginationChange}
      />
    </>
  );
};
