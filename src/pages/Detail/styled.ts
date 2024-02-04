import { styled, css } from 'styled-components';
import heartImg from '../../assets/icon/heart.svg';
import heartFillImg from '../../assets/icon/heart_fill.svg';
import saveImg from '../../assets/icon/save.svg';
import saveFillImg from '../../assets/icon/save_fill.svg';

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
  width: 683px;
  /* margin-right: 240px; */
  margin-bottom: 80px;
`;

export const WriteAnswerForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 683px;
  /* height: 400px; */
  margin-top: 40px;
`;

export const Title = styled.div`
  font-size: 18px;
  color: #475569;
  margin-left: 10px;
`;

export const QuestionTitleSection = styled.div<ICustomMargin>`
  display: flex;
  ${customMargin};
`;

export const QuestionTypo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: #7c3aed;
  border-radius: 50%;
  font-family: 'Inter', sans-serif;
  color: #fff;
  font-size: 26px;
  font-weight: 600;
`;

export const QuestionTitle = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  color: #0f172a;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 16px;
`;

export const QuestionBodySection = styled.div`
  width: 683px;
  height: fit-content;
  flex-shrink: 0;
  border-top: 1px solid #e2e8f0;
  margin-top: 12px;
  padding: 20px 0px 20px 25px;
`;

export const QuestionTopContainer = styled.div`
  display: flex;
  width: 100%;
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

export const ViewDateContainer = styled.div`
  display: flex;
  margin-left: 27px;
  margin-bottom: 3px;
`;

export const ContentTypo = styled.div`
  flex: 1;
  color: #0f172a;
  font-size: 15px;
  font-weight: 400;
  margin-left: 27px;
`;

export const QuestionBottomContainer = styled.div`
  display: flex;
  position: relative;
  height: 110px;
`;

export const QuestionBottomLeftContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`;

export const QuestionBottomRightContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 136px;
  flex-shrink: 0;
`;

export const AuthorBox = styled.div`
  position: relative;
  width: 100%;
  height: 82px;
  border-radius: 10px;
  border: 0.5px solid #e2e8f0;
  background: #fff;
  padding: 11px;
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

export const AskedTypo = styled.div`
  color: #475569;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  margin-left: 5px;
`;

export const AuthorContainer = styled.div`
  position: absolute;
  bottom: 11px;
  left: 11px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const AuthorProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 35px;
  border-radius: 10px;
  background: #f1f5f9;
  margin-right: 10px;
  color: #64748b;
  font-size: 16px;
  font-weight: 400;
`;

interface IUserStateCircle {
  color?: string;
}

export const UserStateCircle = styled.div<IUserStateCircle>`
  width: 15px;
  height: 15px;
  background: ${props => props.color};
  border-radius: 50%;
`;

export const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 41px;
  border-top: 1px solid #e2e8f0;
  background: #fff;
  padding: 10px 8px 10px 0;
`;

export const CommentInput = styled.textarea`
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

export const CommentContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

export const CommentInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 160px;
  justify-self: flex-end;
`;
