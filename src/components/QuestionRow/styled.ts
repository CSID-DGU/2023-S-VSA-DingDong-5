import { styled } from 'styled-components';

export const TableRow = styled.tr`
  display: flex;
  width: 683px;
`;

export const TableCell = styled.td`
  flex: 1;
  display: flex;
  flex-direction: row;
  /* height: 180px; */
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 150px;
  border-bottom: 1px solid #e2e8f0;
  /* white-space: nowrap;*/
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #475569;
  margin: 22px 0;
  margin-left: 28px;
  /* padding-left: 46px; */
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3px 0;
  min-width: 105px;
  height: 35px;
  flex-shrink: 0;
  padding-left: 3px;
  padding-right: 10px;
  /* border-radius: 5px; */
`;

export const PurpleBox = styled(Box)`
  border-radius: 8px;
  border: 1px solid #8b5cf6;
`;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  min-width: 28px;
  font-size: 16px;
  margin-right: 7px;
`;

export const PurpleDiv = styled(Div)`
  color: #8b5cf6;
`;

export const Span = styled.div`
  font-size: 16px;
`;

export const PurpleSpan = styled(Span)`
  color: #8b5cf6;
`;

export const Context = styled.div`
  flex: 1;
  height: 100%;
  margin-left: 40px;
`;

export const Title = styled.div`
  margin: 28px 30px 0 0;
  font-size: 17px;
  width: 484px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* font-weight: 500; */
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const Addition = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 53px 0 10px 0;
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
  margin-bottom: 5px;
  &:hover {
    cursor: pointer;
  }
`;

export const Author = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  font-size: 14px;
  margin-left: 5px;
`;

export const Date = styled.div`
  min-width: 141px;
  color: #64748b;
  align-items: center;
  margin: 0 45px 0 15px;
  font-size: 13px;
`;
