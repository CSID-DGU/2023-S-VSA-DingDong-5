import { styled, css } from 'styled-components';
import heartImg from 'assets/icon/heart.svg';
import heartFillImg from 'assets/icon/heart_fill.svg';
import saveImg from 'assets/icon/save.svg';
import saveFillImg from 'assets/icon/save_fill.svg';

interface ICustomMargin {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

const customMargin = css<ICustomMargin>`
  margin: ${props => `${props.top || '0px'} ${props.right || '0px'} ${props.bottom || '0px'} ${props.left || '0px'}`};
`;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const ItemContainer = styled.div<ICustomMargin>`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${customMargin}
`;
export const Item = styled.div`
  display: flex;
`;
export const ItemTypo = styled.div`
  color: #64748b;
  text-align: center;
  font-size: 8px;
  font-weight: 400;
`;

export const HeartIcon = styled.img.attrs<ICustomMargin>({
  src: heartImg,
})`
  width: ${props => (props.width ? props.width : '18px')};
  height: ${props => (props.width ? props.width : '18px')};
  ${customMargin};
  cursor: pointer;
`;

export const HeartFillIcon = styled.img.attrs<ICustomMargin>({
  src: heartFillImg,
})`
  width: ${props => (props.width ? props.width : '18px')};
  height: ${props => (props.width ? props.width : '18px')};
  ${customMargin};
  cursor: pointer;
`;

export const SaveIcon = styled.img.attrs<ICustomMargin>({
  src: saveImg,
})`
  width: ${props => (props.width ? props.width : '18px')};
  height: ${props => (props.width ? props.width : '15px')};
  ${customMargin};
  cursor: pointer;
`;

export const SaveFillIcon = styled.img.attrs<ICustomMargin>({
  src: saveFillImg,
})`
  width: ${props => (props.width ? props.width : '18px')};
  height: ${props => (props.width ? props.width : '15px')};
  ${customMargin};
  cursor: pointer;
`;

interface ITypo extends ICustomMargin {
  color?: string;
  size?: string;
  underline?: string;
  pointer?: string;
  justifyself?: string;
}

export const Typo = styled.span<ITypo>`
  display: inline-block;
  color: ${props => (props.color ? props.color : '#64748b')};
  font-size: ${props => (props.size ? props.size : '14px')};
  font-weight: 400;
  justify-self: ${props => (props.justifyself ? props.justifyself : 'auto')};
  &:not(:first-child) {
    margin-left: 8px;
  }
  ${customMargin}
  &:hover {
    cursor: ${props => (props.pointer ? 'pointer' : 'default')};
    text-decoration-line: ${props => (props.underline ? 'underline' : 'none')};
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 41px;
  border-top: 1px solid #e2e8f0;
  background: #fff;
  padding: 10px 8px 10px 0;
`;

export const Input = styled.textarea`
  width: 100%;
  height: 95px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #fff;
  resize: none;
  padding: 10px 15px;

  /* 스크롤바 전체 기본 꾸미기 */
  &::-webkit-scrollbar {
    width: 8px; /* 세로축 스크롤바 폭 너비 */
  }

  /* 스크롤바 막대 꾸미기 */
  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 10px;
  }

  /* 스크롤바 트랙 꾸미기 */
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 160px;
  justify-self: flex-end;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
