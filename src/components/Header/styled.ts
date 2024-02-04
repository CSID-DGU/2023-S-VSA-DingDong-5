import styled from 'styled-components';
import SearchIcon from '../../assets/icon/search.svg';
import Logo from '../../assets/icon/logo.svg';
import NotificationIcon from '../../assets/icon/notification.svg';
import { SearchBar } from './SearchBar';

export const Root = styled.header`
  width: 1300px;
  padding-top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

export const LogoSection = styled.div`
  display: flex;
  width: 185px;
  height: 54px;
  justify-content: center;
  align-items: center;
  /* padding-right: 25px; */
  /* margin-right: 20px; */
  margin-left: 65px;
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

export const NotificationSection = styled.img.attrs({
  src: NotificationIcon,
})`
  width: 32px;
  height: 32px;
  margin-left: 17px;
  &:hover {
    cursor: pointer;
  }
`;

export const Fragment = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

interface IWrapper {
  $ishome?: boolean;
  $isSearching?: boolean;
}

export const Wrapper = styled.div<IWrapper>`
  display: flex;
  justify-content: center;
  width: ${props => (props.$ishome ? '686px' : '661px')};
  height: ${props => (props.$ishome ? '68px' : '48px')};
  border-radius: ${props => (props.$isSearching ? '15px' : '50px')};
  border-bottom-left-radius: ${props => (props.$isSearching ? '0' : '50px')};
  border-bottom-right-radius: ${props => (props.$isSearching ? '0' : '50px')};
  background: #fff;
  box-shadow: 0px 0px ${props => (props.$ishome ? '20px' : '8px')} 0px rgba(100, 116, 139, 0.18);
  transition: all 0.3s ease-in-out;

  .SearchInput {
    width: 661px;
    height: 100%;
    border-radius: 50px;
    background-image: url(${SearchIcon});
    background-size: ${props => (props.$ishome ? '23px' : '18px')};
    background-repeat: no-repeat;
    background-position: ${props => (props.$ishome ? '30px 50%' : '18px 50%')};
    padding-left: ${props => (props.$ishome ? '75px' : '60px')};
    padding-right: ${props => (props.$ishome ? '25px' : '0')};
    font-size: ${props => (props.$ishome ? '18px' : '16px')};
    ${props =>
      props.$ishome &&
      `
  &::placeholder {
    color: #94a3b8;
    text-align: center;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`}
  }

  .Div {
    width: 50px;
    background-color: transparent;
    display: grid;
    place-items: center;

    svg {
      cursor: pointer;
      font-size: 16px;
      margin-right: 10px;
    }
  }
`;

export const SearchInput = styled.input<IWrapper>`
  width: 100%;
  height: 100%;
  border-radius: ${props => (props.$isSearching ? '5px' : '20px')};
  background-image: url(${SearchIcon});
  background-size: ${props => (props.$ishome ? '23px' : '18px')};
  background-repeat: no-repeat;
  background-position: ${props => (props.$ishome ? '30px 50%' : '18px 50%')};
  padding-left: ${props => (props.$ishome ? '75px' : '60px')};
  padding-right: ${props => (props.$ishome ? '25px' : '0')};
  font-size: ${props => (props.$ishome ? '18px' : '16px')};
  ${props =>
    props.$ishome &&
    `
  &::placeholder {
    color: #94a3b8;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`}
`;

export const DataResult = styled.div`
  width: 100%;
  max-height: 200px;
  background-color: white;
  border-radius: 0 0 20px 20px;
  margin-top: 65px;
  box-shadow: 0px 8px 8px 0px rgba(100, 116, 139, 0.1);
  overflow: hidden;
  overflow-y: auto;
  position: absolute;
  /* padding: 0 0 0 10px; */
  z-index: 2;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  a {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    // align-items: center;
    color: black;
    text-decoration: none;
    padding: 8px 25px;
    padding-left: 75px;

    &:last-child {
      padding-bottom: 12px;
    }

    &:hover {
      background-color: #f1f5f9;
      cursor: pointer;
    }
    .title {
      font-size: 16px;
      color: #1e293b;
      font-weight: 500;
    }
    .content {
      all: unset;
      font-size: 13px;
      color: #1e293b;

      > * {
        all: unset;
        display: inline-block;

        &:not(:first-child) {
          margin-left: 2px;
        }
      }
    }
  }
`;
