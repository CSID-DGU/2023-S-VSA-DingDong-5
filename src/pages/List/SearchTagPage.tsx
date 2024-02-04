import { useLocation, useNavigate } from 'react-router-dom';
import instance from 'api/axios';
import React, { useEffect, useState } from 'react';
import type { QuestionDataType } from 'stores/page-store';
import { QuestionRow } from '../../components/QuestionRow';
import { Table, Tbody } from '../../components/List/ArticlesTable/styled';
import { Div, Title, Root } from './styled';
import { Loading } from 'components/Loading';
import { Default } from './Default';

export const SearchTagPage = () => {
  const [SearchData, setSearchData] = useState<QuestionDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hashtag = queryParams.get('hashtag');
  const navigate = useNavigate();
  // console.log(hashtag);

  useEffect(() => {
    const fetchSearchData = async (hashtag: string) => {
      try {
        setIsLoading(true);
        const response = await instance.get(`/api/search/hashtag/?hashtag=${encodeURIComponent(hashtag)}`);
        setSearchData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (hashtag) fetchSearchData(hashtag);
  }, [hashtag]);

  return (
    <Root>
      <Title>검색결과</Title>
      {isLoading ? (
        <Loading />
      ) : (
        <Table>
          <Tbody>
            {SearchData?.map((item, idx) => (
              <QuestionRow key={idx} item={item} />
            ))}
          </Tbody>
        </Table>
      )}
      <Default />
    </Root>
  );
};
