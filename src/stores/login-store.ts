import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const authAtom = atom({
  key: 'auth',
  default: JSON.parse(localStorage.getItem('user') as string)
});

const userAtom = atom({
  key: 'user',
  default: null
});

export {
  authAtom,
  userAtom
};

const { persistAtom } = recoilPersist();

export const LoginState = atom({
  key: "LoginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});