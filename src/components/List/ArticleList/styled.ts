import styled from 'styled-components';

export const Root = styled.div`
  padding-bottom: 40px;
`;

export const OrderContainer = styled.div`
  display: flex;
  width: 222px;
  height: 33px;
  flex-shrink: 0;
  color: #0f172a;
  margin-top: 3px;
  /* margin-left: 10px; */
  margin-right: 10px;
  /* border: 0.5px solid #e2e8f0; */
  /* border-radius: 10px; */
  /* background: #f1f5f9; */
  > * {
  }
`;

interface OrderProps {
  selected?: boolean;
}

export const LatestOrder = styled.div<OrderProps>`
  display: flex;
  width: 74px;
  height: 33px;
  justify-content: center;
  align-items: center;
  color: #0f172a;
  font-size: 15px;
  cursor: pointer;
  border: 1px solid #e2e8f0;
  background-color: ${props => (props.selected ? '#F1F5F9' : 'transparent')};
  border-right: 0;
  border-radius: 10px 0px 0px 10px;
`;

export const ViewOrder = styled.div<OrderProps>`
  display: flex;
  width: 74px;
  height: 33px;
  justify-content: center;
  align-items: center;
  color: #0f172a;
  font-size: 15px;
  cursor: pointer;
  border: 1px solid #e2e8f0;
  background-color: ${props => (props.selected ? '#F1F5F9' : 'transparent')};
  border-right: 0;
`;

export const VoteOrder = styled.div<OrderProps>`
  display: flex;
  width: 74px;
  height: 33px;
  justify-content: center;
  align-items: center;
  color: #0f172a;
  font-size: 15px;
  cursor: pointer;
  border: 1px solid #e2e8f0;
  background-color: ${props => (props.selected ? '#F1F5F9' : 'transparent')};
  border-radius: 0px 10px 10px 0px;
`;

export const Holder = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  width: 683px;
  height: 47px;
`;

export const Text = styled.div`
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #475569;
  margin-left: 20px;
  padding-bottom: 10px;
  margin-right: auto;
`;

/* export const Button = styled.button`
  width: 123px;
  height: 44px;
  border-radius: 10px;
  background-color: #7C3AED;
  border: 0px;
  &:hover {
    cursor: pointer;
    background-color: #AC8DCA
  }
`; */

export const Span = styled.span`
  color: white;
  font-size: 18px;
  margin-bottom: 1px;
`;

export const Img = styled.img`
  width: 22px;
  height: 22px;
  color: white;
  margin-right: 3px;
`;

export const ArticleContainer = styled.div`
  width: 683px;
  /* margin-top: 10px; */
  /* border: 1px solid #e6e8e7; */
  /* overflow-x: scroll; */
`;
