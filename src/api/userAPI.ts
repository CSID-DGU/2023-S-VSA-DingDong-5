import api from "./axios";
import axios from "axios";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { authAtom, userAtom } from '../stores/login-store';
import { UserInfo } from "./userInfo";
import { history } from "./history";
import { Pathname } from "history";

interface LocationState {
  from?:{
    pathname: Pathname;
  };
}

export const useUserActions = () => {
  const baseURL = `${process.env.REACT_APP_API_URL}`;
  const [auth, setAuth] = useRecoilState(authAtom);
  const setUser = useSetRecoilState(userAtom);
  const Info = UserInfo();

  return{
    login,
    logout
  }

  function login({ email, password} : {email: string, password:string}){
    return Info.post(`${baseURL}/signin`, {email, password})
        .then( user => {
          localStorage.setItem('user', JSON.stringify(user));
          setAuth(user);

          // const fromLocation = history.location.state && history.location.state.from;
          // const from = (history.location.state && history.location.state.from) || { pathname: '/' };
          const { from } : LocationState = history.location.state || { from: { pathname: '/' } };

          // history.push(from);

        })
  }

  function logout(){
    localStorage.removeItem('user');
    setAuth(null);
    history.push('/');
  }
} 