import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const LoginState = atom({
  key: 'LoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const UserState = atom({
  key: 'UserState',
  default: {
    _id: '',
    email: '',
    username: '',
    phoneNumber: '',
    bookmarkedQuestions: [],
  },
  effects_UNSTABLE: [persistAtom],
});
