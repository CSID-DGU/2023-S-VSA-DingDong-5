import { styled, css } from 'styled-components';
import heartImg from '../../../assets/icon/heart.svg';
import heartFillImg from '../../../assets/icon/heart_fill.svg';
import saveImg from '../../../assets/icon/save.svg';
import saveFillImg from '../../../assets/icon/save_fill.svg';

interface ICustomMargin {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

const customMargin = css<ICustomMargin>`
  margin: ${props => `${props.top || '0px'} ${props.right || '0px'} ${props.bottom || '0px'} ${props.left || '0px'}`};
`;

export const TitleSection = styled.div<ICustomMargin>`
  display: flex;
  ${customMargin};
`;

export const ATypo = styled.div`
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

export const Title = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  color: #525458;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 16px;
`;

export const BodySection = styled.div`
  width: 683px;
  height: fit-content;
  flex-shrink: 0;
  border-top: 1px solid #e2e8f0;
  margin-top: 12px;
  padding: 20px 0px 20px 25px;
`;

export const TopContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
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

export const HeartIcon = styled.img.attrs({
  src: heartImg,
})`
  width: ${props => (props.width ? props.width : '18px')};
  height: ${props => (props.width ? props.width : '18px')};
  margin-bottom: 2px;
  cursor: pointer;
`;

export const HeartFillIcon = styled.img.attrs({
  src: heartFillImg,
})`
  width: ${props => (props.width ? props.width : '18px')};
  height: ${props => (props.width ? props.width : '18px')};
  margin-bottom: 2px;
  cursor: pointer;
`;

export const SaveIcon = styled.img.attrs({
  src: saveImg,
})`
  width: ${props => (props.width ? props.width : '18px')};
  height: ${props => (props.width ? props.width : '15px')};
  margin-top: 10px;
  margin-bottom: 2px;
  cursor: pointer;
`;

export const SaveFillIcon = styled.img.attrs({
  src: saveFillImg,
})`
  width: ${props => (props.width ? props.width : '18px')};
  height: ${props => (props.width ? props.width : '15px')};
  margin-top: 10px;
  margin-bottom: 2px;
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

export const BottomContainer = styled.div`
  display: flex;
  position: relative;
  height: 110px;
`;

export const BottomLeftContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`;

export const BottomRightContainer = styled.div`
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
}

export const Typo = styled.span<ITypo>`
  display: inline-block;
  color: ${props => (props.color ? props.color : '#64748b')};
  font-size: ${props => (props.size ? props.size : '12px')};
  font-weight: 400;
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
  height: 41px;
  border-top: 1px solid #e2e8f0;
  background: #fff;
`;
