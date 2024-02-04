import { Root, UserSection, LoginTypo, LogoutTypo, SignUpTypo } from './styled';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LoginState, UserState } from 'stores/login-store';
import { useEffect } from 'react';

export const LoginLogoutButton = () => {
  const isLogin = useRecoilValue(LoginState);
  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [userState, setUserState] = useRecoilState(UserState); // Change this line
  const navigate = useNavigate();
  let token = localStorage.getItem('token');

  const handleLogout = () => {
    // 로그아웃할건지 물어보기
    if (!window.confirm('로그아웃 하시겠습니까?')) return;

    // 로그아웃 로직 수행 후 LoginState atom 값을 false로 변경
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    setUserState({
      _id: '',
      username: '',
      email: '',
      password: '',
      createdAt: '',
      updatedAt: '',
      bookmarkedQuestions: [],
    });
    setLoginState(false);
  };

  useEffect(() => {
    const expirationDate = localStorage.getItem('expirationDate');
    if (expirationDate) {
      const currentDate = new Date().getTime();
      const ComExpirationDate = new Date(expirationDate as string).getTime();
      const timeGap = ComExpirationDate - currentDate;

      if (timeGap > 0) {
        const timeout = setTimeout(() => {
          localStorage.removeItem('token');
          token = null;
          localStorage.removeItem('expirationDate');
          setUserState({
            _id: '',
            username: '',
            email: '',
            password: '',
            createdAt: '',
            updatedAt: '',
            bookmarkedQuestions: [],
          });
          setLoginState(false);
        }, timeGap);

        return () => {
          clearTimeout(timeout);
        };
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        token = null;
        setLoginState(false);
      }
    }
    // console.log(localStorage.getItem('token'));
    // console.log(loginState);
  }, [token]);

  return (
    <Root>
      {token && isLogin ? (
        <UserSection onClick={() => navigate('/mypage')}>{userState?.username}</UserSection>
      ) : (
        <LoginTypo onClick={() => navigate('/signin')}> 로그인 </LoginTypo>
      )}
      {token && isLogin ? (
        <LogoutTypo onClick={handleLogout}>로그아웃</LogoutTypo>
      ) : (
        <SignUpTypo onClick={() => navigate('/signup')}>회원가입</SignUpTypo>
      )}
    </Root>
  );
};
