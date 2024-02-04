import styled, { keyframes } from 'styled-components';
import loadingImg from 'assets/icon/loading.svg';

export const Text = styled.div`
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #475569;
  margin-left: 20px;
  padding-bottom: 10px;
  margin-right: auto;
`;

export const LButton = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3px;
  margin-right: 10px;
`;

export const Button1 = styled.button<{ $result?: string }>`
  display: flex;
  width: 74px;
  height: 33px;
  border: 1px solid #e2e8f0;
  border-radius: 10px 0 0 10px;
  background-color: ${props => (props.$result === 'answer' ? '#F1F5F9' : '#FFFFFF')};
  color: #0f172a;
  font-size: 15px;
  padding: 7px 0;
  align-items: center;
  justify-content: center;
`;

export const Button2 = styled.button<{ $result?: string }>`
  display: flex;
  width: 74px;
  height: 33px;
  border: 1px solid #e2e8f0;
  padding: 7px 0;
  border-radius: 0 10px 10px 0;
  background-color: ${props => (props.$result === 'comment' ? '#F1F5F9' : '#FFFFFF')};
  color: #0f172a;
  font-size: 15px;
  align-items: center;
  justify-content: center;
`;

export const Table = styled.div`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 100px;
  td {
    min-height: 121px;
    border-bottom: 1px solid #e2e8f0;
  }
`;

export const Tbody = styled.div`
  border-top: 1px solid #e2e8f0;
`;
