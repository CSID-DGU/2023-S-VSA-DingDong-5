import styled, { keyframes } from 'styled-components';
import SearchIcon from '../../assets/icon/search.svg';
import Logo from '../../assets/icon/logo.svg';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  // border: 1px solid black;
  width: 100vw;
  height: 100%;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1280px;
  margin: 0 auto;
  margin-top: 25px;
`;
export const LogoSection = styled.div`
  display: flex;
  width: 136px;
  height: 54px;
  justify-content: center;
  align-items: center;
  /* padding-right: 25px; */
  /* margin-right: 0px; */
  margin-left: 60px;
  &:hover {
    cursor: pointer;
  }
`;

export const LogoImg = styled.img.attrs({
  src: Logo,
})`
  width: 22px;
  height: 22px;
`;

export const LogoTypo = styled.div`
  color: #7c3aed;
  text-align: right;
  font-family: 'Inter';
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -1px;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 91px;
`;

export const SearchBar = styled.input`
  width: 687px;
  height: 68px;
  border-radius: 50px;
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  background-position: 30px 50%;
  box-shadow: 0px 0px 30px 0px rgba(100, 116, 139, 0.18);
  font-size: 18px;
  /* text-align: center;/ */
  padding-left: 70px;
  border: 0.1px solid #e2e8f0;
  &::placeholder {
    color: #94a3b8;
    padding-left: 115px;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
export const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 38px;
`;

export const Button1 = styled.button`
  width: 100px;
  height: 47px;
  border-radius: 50px;
  background: #7c3aed;
  color: #fff;
  text-align: center;
  font-size: 18px;
  margin-right: 8px;
  letter-spacing: 0.3px;
  transition: 0.1s;
  &:hover {
    background: #6d28d9;
  }
`;

export const Button2 = styled.button`
  width: 98px;
  height: 47px;
  border-radius: 50px;
  background: transparent;
  color: #7c3aed;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.3px;
  transition: 0.1s;
  &:hover {
    text-decoration: underline;
  }
`;

export const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 699px;
  height: 225px;
  margin-top: 38px;
`;

export const QuestionBlock = styled.div`
  width: 323px;
  /* border: 1px solid black; */
`;

export const AnswerBlock = styled.div`
  width: 323px;
  /* border: 1px solid black; */
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const QuestionTypo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  background: #7c3aed;
  border-radius: 50%;
  font-family: 'Inter', sans-serif;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`;

export const TitleText = styled.div`
  margin-left: 9px;
  color: #475569;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
`;

export const TopItems = styled.ul`
  margin-top: 14px;
  padding-left: 5px;
`;

interface TopItemProps {
  $ellipsis?: boolean;
}

export const TopItem = styled.li<TopItemProps>`
  display: block;
  color: #475569;
  font-family: Noto Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ${({ $ellipsis }) => ($ellipsis ? 'ellipsis' : 'clip')};
  margin: 10px 0px;
  cursor: pointer;
  &:before {
    content: '•';
    display: inline-block;
    margin-right: 5px;
    color: #475569;
  }
  &:hover {
    /* text-decoration: underline; */
    color: #7c3aed;
  }
  * {
    all: unset;
    display: inline-block;
    margin-right: 2px;
    color: inherit !important;
  }
  *:hover {
    color: #7c3aed !important;
  }
`;

export const DotTypo = styled(TopItem)`
  font-weight: 600;
  &:hover {
    text-decoration: none;
  }
`;

export const slideInAnimation = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  // animation: ${slideInAnimation} 10s linear infinite;
  white-space: nowrap;
`;

export const HashBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* margin-top: 60px; */
  // border: 1px solid black;
  height: 60px;
`;
