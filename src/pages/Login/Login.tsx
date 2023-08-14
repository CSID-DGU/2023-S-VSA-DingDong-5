import { Link } from "react-router-dom";
import { LogoSection, LogoImg, LogoTypo } from "../../components/Header/styled";
import{
  Root,
  Container,
  IDbox,
  PWbox,
  ActionContainer,
  Button1,
  Button2
} from "./styled";
// import { authAtom, userAtom } from "../../stores/login-store";
import { LoginState } from "../../stores/login-store";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserActions } from "../../api/userAPI";
import axios from "axios";
import { response } from "express";
import { stringify } from "querystring";

export const Login = () => {
  // const [ isLoggedIn, setIsLoggedIn ] = useRecoilState(LoginState);
  // const [name, setName] = useState();
  // const navigate = useNavigate();
  
  // const logoutHandler = async() => {
  //   await axios.post("/signout")
  //   .then((res) => {
  //     if (res.status === 200) {
  //       window.localStorage.removeItem("X-AUTH-TOKEN");
  //       setIsLoggedIn(false);
  //       navigate("/");
  //     }
  //   });
  // };

  // useEffect(() => {
  //   let token = window.localStorage.getItem("X-AUTH-TOKEN");
  //   const userInfo = async(token: any) => {
  //     let config = { headers: { "X-AUTH-TOKEN" : token},};
  //     const response = await axios.post("/signin", config);
  //     return response; 
  //     }
  //   userInfo(token).then((res) => {
  //     setName(res.data.map.name)
  //   });
  // }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post(`/api/auth/signin`, { email, password });
      const user = response.data;
      // 로그인 성공 후 처리
      console.log('Logged in:', user);
    } catch (error) {
      // 로그인 실패 시 처리
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    setUserInfo({
      email: email,
      password: password
    });
  }, [])

  return(
    <Root>
      <Container>
        <Link to={"/"}>
          <LogoSection>
            <LogoImg />
            <LogoTypo>DINGDONG</LogoTypo>
          </LogoSection>
        </Link>
        <IDbox placeholder="아이디" value={email} onChange={(e :any)=>setEmail(e.target.value)} />
        <PWbox placeholder="비밀번호" value={password} onChange={(e:any) => setPassword(e.target.value)}/>
        <ActionContainer>
          <Button1 width="144px" height="52px" onClick={handleLogin}>
            로그인
          </Button1>
          <Button2 width="144px" height="52px">
            회원가입
          </Button2>
        </ActionContainer>
      </Container>
    </Root>

  );
};