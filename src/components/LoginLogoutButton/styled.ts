import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 186px;
  margin-right: 57px;
`;

export const UserSection = styled.div`
  display: flex;
  width: 72px;
  height: 47px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  /* margin-left: 50px; */
  background: #f1f5f9;
  color: #64748b;
  font-size: 20px;
  /* font-weight: 500; */
  &:hover {
    cursor: pointer;
  }
`;

export const LoginTypo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 38px;
  /* margin-left: 63px; */
  color: #64748b;
  font-size: 15px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  > * {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const LogoutTypo = styled(LoginTypo)`
  margin-left: 15px;
`;

export const SignUpTypo = styled(LoginTypo)`
  margin-left: 0;
`;
