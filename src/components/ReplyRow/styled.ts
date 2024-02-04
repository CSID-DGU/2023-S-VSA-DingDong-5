import { styled } from 'styled-components';
import heartFillImg from 'assets/icon/heart_fill.svg';

export const TableRow = styled.div`
  display: flex;
  border-bottom: 1px solid #e9ecef;
  &:last-child {
    margin-bottom: 80px;
  }
`;

export const TableCell = styled.div`
  flex: 1;
  display: flex;
  width: 683px;
  padding: 24px 0;
  flex-direction: row;
`;

export const Upper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35px;
  margin-left: 35px;
`;

export const HeartFillIcon = styled.img.attrs({
  src: heartFillImg,
})`
  width: ${props => (props.width ? props.width : '18px')};
  height: ${props => (props.width ? props.width : '18px')};
  margin-bottom: 2px;
  cursor: pointer;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 100%;
`;

export const Text = styled.div`
  width: 15px;
  height: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #64748b;
  text-align: center;
  font-size: 9px;
  font-weight: 400;
  margin-top: 0px;
`;

interface ITitle {
  $isExpanded?: boolean;
}

export const Title = styled.div<ITitle>`
  /* display: flex; */
  /* margin-top: 24px; */
  width: 556px;
  min-height: 50px;
  max-height: ${props => (props.$isExpanded ? '100%' : '180px')};
  overflow: hidden;
  &:hover {
    cursor: pointer;
    /* text-decoration: underline; */
  }
  p {
    margin-top: 0;
  }
`;

export const MoreTypo = styled.div`
  display: inline-block;
  margin-top: 5px;
  color: #64748b;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const Addition = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin-top: 10px;
`;

export const AuthorInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 33px;
`;

export const Author = styled.div`
  align-self: center;
  /* width: 66px; */
  font-size: 14px;
  margin-right: 15px;
`;

export const Date = styled.div`
  color: #64748b;
  align-self: center;
  font-size: 13px;
`;

export const Comment = styled.div`
  display: flex;
  margin-top: 7px;
  border: 1px solid black;
`;

export const HashTagWrapper = styled.div``;

export const HashTag = styled.button`
  margin-right: 7px;
  padding: 5px 10px;
  background-color: #f1f5f9;
  color: #64748b;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;
