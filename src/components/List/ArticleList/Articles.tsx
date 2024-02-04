import { useNavigate } from 'react-router-dom';
import WhiteLogo from '../../../assets/icon/white_logo.svg';
import { ArticlesTable } from '../ArticlesTable/ArticlesTable';
import {
  Holder,
  Text,
  Span,
  Img,
  ArticleContainer,
  Root,
  OrderContainer,
  LatestOrder,
  ViewOrder,
  VoteOrder,
} from './styled';
import { Button } from '../../Button';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { LoginState } from 'stores/login-store';

export const Articles = () => {
  const [selectedOrder, setSelectedOrder] = useState({
    latest: true,
    view: false,
    vote: false,
  });
  const isLogin = useRecoilValue(LoginState);

  const navigate = useNavigate();

  const onClickWrite = useCallback(() => {
    // 로그인 상태에 따라 페이지 이동 여부 결정
    if (isLogin) {
      navigate('/articles/write');
    } else {
      // 로그인이 필요한 알림 등을 처리할 수 있습니다.
      alert('로그인이 필요합니다.');
      navigate('/signin');
    }
  }, [isLogin]);

  const onClickSelected = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.innerText === '최신순') {
      setSelectedOrder({ latest: true, view: false, vote: false });
    }
    if (target.innerText === '조회순') {
      setSelectedOrder({ latest: false, view: true, vote: false });
    }
    if (target.innerText === '관심순') {
      setSelectedOrder({ latest: false, view: false, vote: true });
    }
  };

  return (
    <Root>
      <Holder>
        <Text>Questions</Text>
        <OrderContainer>
          <LatestOrder onClick={onClickSelected} selected={selectedOrder.latest}>
            최신순
          </LatestOrder>
          <ViewOrder onClick={onClickSelected} selected={selectedOrder.view}>
            조회순
          </ViewOrder>
          <VoteOrder onClick={onClickSelected} selected={selectedOrder.vote}>
            관심순
          </VoteOrder>
        </OrderContainer>
        <Button width="123px" bottom="7px" right="10px" onClick={onClickWrite}>
          <Img src={WhiteLogo} />
          <Span>질문하기</Span>
        </Button>
      </Holder>
      <ArticleContainer>
        <ArticlesTable selectedOrder={selectedOrder} />
      </ArticleContainer>
    </Root>
  );
};
