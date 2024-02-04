import { useLocation } from 'react-router-dom';
import instance from 'api/axios';
import React, { useCallback, useEffect, useState } from 'react';
import { QuestionRow, ReplyRow } from '../../components';
import { Table, Tbody } from '../../components/List/ArticlesTable/styled';
import { Div, NoData, SorryImg, Title, Root } from './styled';
import { Loading } from 'components/Loading';
import type { QuestionDataType, AnswerDataType } from 'types/types';

export const SearchPage = () => {
  const [expandedStates, setExpandedStates] = useState<{ [itemId: string]: boolean }>({});
  const [SearchData, setSearchData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword');

  const onClickExpanded = useCallback(
    (itemId: string) =>
      setExpandedStates(prevStates => ({
        ...prevStates,
        [itemId]: !prevStates[itemId],
      })),
    [],
  );

  useEffect(() => {
    if (SearchData) {
      const initialExpandedStates: { [itemId: string]: boolean } = {};
      SearchData.forEach(data => {
        if (data.questionId && data.content.length > 200) {
          initialExpandedStates[data._id] = false;
        }
      });
      setExpandedStates(initialExpandedStates);
    }
  }, [SearchData]);

  useEffect(() => {
    const fetchSearchData = async (keyword: string) => {
      try {
        setIsLoading(true);
        const response = await instance.get(`/api/search?keyword=${encodeURIComponent(keyword)}`);
        setSearchData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (keyword) fetchSearchData(keyword);
  }, [keyword]);

  return (
    <Root>
      <Title>검색결과</Title>
      {isLoading ? (
        <Loading />
      ) : SearchData.length > 0 ? (
        <Table>
          <Tbody>
            {SearchData &&
              SearchData.map((item, idx) =>
                (item.title as string) ? (
                  <QuestionRow key={idx} item={item} />
                ) : (
                  <ReplyRow
                    key={idx}
                    item={item}
                    type="answer"
                    expandedStates={expandedStates}
                    onClickExpanded={() => onClickExpanded(item._id as string)}
                  />
                ),
              )}
          </Tbody>
        </Table>
      ) : (
        <NoData>
          <SorryImg />
          관련된 글이 존재하지 않습니다.
        </NoData>
      )}
    </Root>
  );
};
