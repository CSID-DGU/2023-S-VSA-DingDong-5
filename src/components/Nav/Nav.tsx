import { useMemo } from 'react';
import { Container, NavItem } from './styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { PageState } from "../../stores/link-store";

type navItem = {
  name: string;
  src: string;
};

type navItems = navItem[];

export const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 정보를 가져옴

  //리코일 이용해서 hashtag 값 넘기기
  const [currentPage, setCurrentPage] = useRecoilState(PageState);
  const PageChange = (page:string) => {
    setCurrentPage(page);
    navigate(`${page}`);
  }

  // mypage Nav가 나타날 URL 조건 설정
  const showMyPageNav = location.pathname.includes('/mypage');

  const navDefaultItems = useMemo<navItems>(
    () => [
      { name: 'Home', src: '/' },
      { name: 'Questions', src: '/articles' },
      { name: 'Replies', src: '/replies' },
    ],
    [],
  );

  // 작성한 질문, 작성한 답변, 작성한 댓글, 저장한 질문, 저장한 답변, 저장한 댓글
  const navMyPageItems = useMemo<navItems>(
    () => [
      { name: '작성한 질문', src: '/mypage' },
      { name: '작성한 답변', src: '/mypage/answers' },
      { name: '작성한 댓글', src: '/mypage/comments' },
      { name: '저장한 질문', src: '/mypage/bookmarks/questions' },
      { name: '저장한 답변', src: '/mypage/bookmarks/answers' },
      { name: '저장한 댓글', src: '/mypage/bookmarks/comments' },
    ],
    [],
  );

  return (
    <Container>
      {(showMyPageNav ? navMyPageItems : navDefaultItems).map((item, idx) => (
        <NavItem key={`${item.name}_${idx}`} onClick={() => PageChange(item.src) } >
          {item.name}
        </NavItem>
      ))}
    </Container>
  );
};

//{/*navigate(item.src)}*/}