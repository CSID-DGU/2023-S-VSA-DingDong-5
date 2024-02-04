import { useNavigate } from 'react-router-dom';
import {
  CategoryContainer,
  CategoryList,
  DingDongContainer,
  FacebookImg,
  GiveRunContainer,
  InformationRoot,
  InstagramImg,
  LogoImg,
  LogoSection,
  LogoTypo,
  LowerContainer,
  SNSContainer,
  Title,
  TwitterImg,
  Typo,
  UpperContainer,
  YoutubeImg,
} from './styled';

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <InformationRoot>
      <UpperContainer>
        <GiveRunContainer>
          <LogoSection>
            <LogoImg />
            <LogoTypo>DINGDONG</LogoTypo>
          </LogoSection>
          <Typo>동국대학교 산학연계프로젝트 딩동팀</Typo>
          <Typo>kng001016@dgu.ac.kr</Typo>
        </GiveRunContainer>
        <CategoryContainer>
          <Title pointer="true" onClick={() => navigate('/articles/write')}>
            질문하러가기
          </Title>
          <Typo top="25px" bottom="12px" weight={500}>
            All Category
          </Typo>
          <CategoryList>
            <Typo pointer="true" bottom="10px" weight={500} onClick={() => navigate('/')}>
              Home
            </Typo>
            <Typo pointer="true" bottom="10px" weight={500} onClick={() => navigate('/articles')}>
              Questions
            </Typo>
            <Typo pointer="true" bottom="10px" weight={500} onClick={() => navigate('/mypage')}>
              MyPage
            </Typo>
            <Typo pointer="true" bottom="10px" weight={500} onClick={() => navigate('/replies')}>
              Replies
            </Typo>
          </CategoryList>
        </CategoryContainer>
        <DingDongContainer>
          <Title bottom="21px">DINGDONG</Title>
          <Typo>동국대학교 산학연계프로젝트 딩동팀은 탈중앙성을 지향하는</Typo>
          <Typo>여행 커뮤니티를 제작하고 있습니다.</Typo>
        </DingDongContainer>
      </UpperContainer>
      <LowerContainer>
        <Typo>© 2023 DINGDONG</Typo>
        <Typo pointer="true">공지사항</Typo>
        <Typo pointer="true">이용약관</Typo>
        <Typo pointer="true">개인정보처리방침</Typo>
        <Typo pointer="true">고객지원</Typo>
        <SNSContainer>
          <FacebookImg />
          <YoutubeImg />
          <TwitterImg />
          <InstagramImg />
        </SNSContainer>
      </LowerContainer>
    </InformationRoot>
  );
};
