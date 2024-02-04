import { Link } from 'react-router-dom';
import {
  Root,
  LogoSection,
  LogoImg,
  LogoTypo,
  Container,
  IDbox,
  PWbox,
  ActionContainer,
  Button1,
  Button2,
} from './styled';
import { LoginState, UserState } from '../../stores/login-store';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import instance from 'api/axios';

export const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [userState, setUserState] = useRecoilState(UserState);
  const [name, setName] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();

    try {
      const tokenResponse = await instance.post('/api/auth/signin', {
        email: email,
        password: password,
      });
      const { token } = tokenResponse.data;
      const currentDate = new Date().getTime();
      const expirationDate = new Date(currentDate + 60 * 60 * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate.toString());
      console.log('로그인 성공:', tokenResponse.data);

      // 유저 정보 받아오기
      const userResponse = await instance.get('/api/mypage', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = userResponse.data;
      console.log('유저정보:', user);

      // 로그인 성공 후
      setIsLoggedIn(true);
      setUserState(user);

      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('로그인 실패:', (error as any).response.data.reason);
    }
  };

  return (
    <Root>
      <Container>
        <Link to={'/'}>
          <LogoSection>
            <LogoImg />
            <LogoTypo>DINGDONG</LogoTypo>
          </LogoSection>
        </Link>
        <IDbox placeholder="이메일" value={email} type="text" id="email" onChange={handleEmailChange} />
        <PWbox placeholder="비밀번호" value={password} type="password" id="password" onChange={handlePasswordChange} />
        <ActionContainer>
          <Button1 type="submit" onClick={handleLogin}>
            로그인
          </Button1>
          <Button2>회원가입</Button2>
        </ActionContainer>
      </Container>
    </Root>
  );
};
