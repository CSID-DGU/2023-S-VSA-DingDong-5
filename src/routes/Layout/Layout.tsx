import { Outlet, useLocation } from 'react-router-dom';
import { Header, Nav, HashTagNav, RightWrapper, Footer } from '../../components';
import { Container, Root, LeftWrapper, Main } from './styled';
export const Layout = () => {
  const location = useLocation(); // 현재 URL 정보를 가져옴

  // 푸터가 나타날 URL 조건 설정
  // /articles나 /mypage를 포함할 때만 푸터가 나타남
  const showFooter =
    location.pathname.includes('/articles') ||
    location.pathname.includes('/questions') ||
    location.pathname === '/mypage';

  /*   // 해시태그 네비게이션 바가 나타날 URL 조건 설정
  // /articles나 /replies 일 때만 해시태그 네비게이션 바가 나타남*/
  /* const showHashTagNav =
    location.pathname.includes('/articles') ||
    location.pathname.includes('/replies') ||
    location.pathname.includes(`/search`); */

  return (
    <Root>
      <Header />
      <Container>
        <LeftWrapper>
          <Nav />
          <HashTagNav />
        </LeftWrapper>
        <Main>
          <Outlet />
        </Main>
        <RightWrapper />
      </Container>
      {showFooter && <Footer />}
    </Root>
  );
};
