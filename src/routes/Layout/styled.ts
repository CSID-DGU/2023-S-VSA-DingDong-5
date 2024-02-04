import styled from 'styled-components';

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Container = styled.div`
  max-width: 1300px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

export const LeftWrapper = styled.div`
  position: sticky;
  top: 10px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Main = styled.main`
  margin-right: 40px;
`;

export const Footer = styled.footer`
  width: 1150px;
  display: flex;
  justify-content: flex-end;
  color: #475569;
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 50px;
`;
