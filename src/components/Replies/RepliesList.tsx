import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Text, Tbody, Table, LButton, Button1, Button2 } from './styled';
import { useNavigate } from 'react-router-dom';
import WhiteLogo from '../../assets/icon/white_logo.svg';
import { Holder, Img, Span } from '../List/ArticleList/styled';
import { Button } from '../Button';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { ReplyRow } from '../ReplyRow';
import { Loading } from 'components/Loading';
import instance from 'api/axios';

const fetchUrl = async (url: string) => {
  const response = await instance.get(url);
  return response.data;
};

export const RepliesList = () => {
  const [expandedStates, setExpandedStates] = useState<{ [itemId: string]: boolean }>({});
  const [result, setResult] = useState('answer');

  const navigate = useNavigate();

  const initialUrl = useMemo(() => `/api/${result}/all`, [result]);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } = useInfiniteQuery(
    result,
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: lastPage => lastPage.nextPageUrl || undefined,
    },
  );

  const ButtonClick = (buttonNumber: number) => {
    if (buttonNumber === 1) {
      setResult('answer');
    } else if (buttonNumber === 2) {
      setResult('comment');
    }
  };

  const onClickWrite = () => {
    navigate('/articles/write');
  };

  const onClickExpanded = useCallback(
    (itemId: string) =>
      setExpandedStates(prevStates => ({
        ...prevStates,
        [itemId]: !prevStates[itemId],
      })),
    [],
  );

  useEffect(() => {
    if (data) {
      const initialExpandedStates: { [itemId: string]: boolean } = {};
      data.pages.forEach(pageData => {
        const items = pageData.answers || pageData.comments; // Choose items based on availability
        items.forEach((item: any) => {
          if (item.content.length > 200) {
            initialExpandedStates[item._id] = false;
          }
        });
      });
      setExpandedStates(initialExpandedStates);
      console.log(data.pages);
    }
  }, [data]);

  if (isError) return <div>{error instanceof Error ? error.message : 'An error occurred'}</div>;

  return (
    <>
      <Holder>
        <Text>Replies</Text>
        <LButton>
          <Button1 onClick={() => ButtonClick(1)} $result={result}>
            답변
          </Button1>
          <Button2 onClick={() => ButtonClick(2)} $result={result}>
            댓글
          </Button2>
        </LButton>
        <Button width="123px" bottom="8px" right="10px" onClick={onClickWrite}>
          <Img src={WhiteLogo} />
          <Span>질문하기</Span>
        </Button>
      </Holder>
      <Table>
        <Tbody>
          <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
            {data?.pages ? (
              data?.pages?.map((pageData, index) => {
                const items = pageData.answers || pageData.comments;
                const type = pageData.answers ? 'answer' : 'comment';
                return (
                  <React.Fragment key={index}>
                    {items?.map((item: any) => (
                      <ReplyRow
                        key={item._id}
                        type={type}
                        item={item}
                        expandedStates={expandedStates}
                        onClickExpanded={() => onClickExpanded(item._id)}
                      />
                    ))}
                  </React.Fragment>
                );
              })
            ) : (
              <></>
            )}
          </InfiniteScroll>
          {isLoading || (isFetching && <Loading />)}
        </Tbody>
      </Table>
    </>
  );
};
