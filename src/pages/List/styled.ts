import styled from 'styled-components';
import Sorry from '../../assets/icon/sorryEmoji.svg';

export const ListContainer = styled.div`
  /* margin-right: 40px; */
`;

export const Div = styled.div`
  width: 683px;
`;

export const NoData = styled(Div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  font-size: 17px;
  color: #475569;
`;

export const SorryImg = styled.img.attrs({
  src: Sorry,
})`
  margin-top: 20px;
  margin-bottom: 15px;
  width: 30px;
  height: 30px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #475569;
  margin-top: 7px;
  margin-left: 20px;
  padding-bottom: 10px;
`;

export const Root = styled.div`
  width: 683px;
`;
