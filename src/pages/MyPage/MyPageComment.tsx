import { Table, Tbody, Title, Typo } from './styled';
import { Loading, ReplyRow } from 'components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import instance from 'api/axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller';

export const MyPageComment = () => {
  const [expandedStates, setExpandedStates] = useState<{ [itemId: string]: boolean }>({});
  const location = useLocation();
  const path = location.pathname;

  const token = useMemo(() => localStorage.getItem('token'), []);
  const myCommentUrl = useMemo(() => `/api/mypage/comments`, []);
  const bookmarkCommentUrl = useMemo(() => `/api/mypage/bookmarks/comments`, []);

  const fetchUrl = useCallback(
    async (url: string) => {
      const response = await instance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    [location, token],
  );

  const initialPageUrl = path === '/mypage/bookmarks/comments' ? bookmarkCommentUrl : myCommentUrl;

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error, refetch } = useInfiniteQuery(
    'comments',
    ({ pageParam = initialPageUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: lastPage => lastPage.nextPageUrl || undefined,
    },
  );

  const onClickExpanded = useCallback(
    (itemId: string) =>
      setExpandedStates(prevStates => ({
        ...prevStates,
        [itemId]: !prevStates[itemId],
      })),
    [],
  );

  // 경로가 변경되었을 때 refetch 메서드를 호출하여 데이터 다시 가져오기
  useEffect(() => {
    refetch();
  }, [path, refetch]);

  if (isError) return <div>{error instanceof Error ? error.message : 'An error occurred'}</div>;

  return (
    <>
      <Title>{path === '/mypage/comments' ? '작성한 댓글' : '저장한 댓글'}</Title>
      <Table>
        <Tbody>
          <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
            {data?.pages?.map(pageData =>
              pageData?.comments?.length > 0 ? (
                pageData?.comments?.map((item: any) => (
                  <ReplyRow
                    key={item._id}
                    type="comment"
                    item={item}
                    expandedStates={expandedStates}
                    onClickExpanded={() => onClickExpanded(item._id)}
                  />
                ))
              ) : (
                <Typo>{path === '/mypage/comments' ? '작성한' : '저장한'}&nbsp;댓글이 없습니다.</Typo>
              ),
            )}
          </InfiniteScroll>
          {isLoading || (isFetching && <Loading />)}
        </Tbody>
      </Table>
    </>
  );
};
