import { styled, css } from 'styled-components';
import heartImg from '../../assets/icon/heart.svg';
import heartFillImg from '../../assets/icon/heart_fill.svg';
import saveImg from '../../assets/icon/save.svg';
import saveFillImg from '../../assets/icon/save_fill.svg';

export const Root = styled.form`
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
