import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  width: 185px;
  margin-right: 40px;
  margin-left: 75px;
`;

export const NavItem = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 47px;
  border-bottom: 1px solid #e2e8f0;
  padding-right: 19px;
  &:hover {
    cursor: pointer;
  }
`;
