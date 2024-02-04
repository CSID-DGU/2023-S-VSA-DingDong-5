import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import { Layout } from './routes/Layout';
import { RecoilRoot } from 'recoil';
// import axios from 'api/axios';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import {
  Home,
  Login,
  List,
  Detail,
  WriteQuestion,
  ModifyQuestion,
  Replies,
  SearchPage,
  SearchTagPage,
  MyPageQuestion,
  MyPageAnswer,
} from './pages';
import { MyPageComment } from 'pages/MyPage/MyPageComment';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/articles" element={<Layout />}>
              <Route index element={<List />} />
              <Route path="/articles/:_id" element={<Detail />} />
              <Route path="/articles/write" element={<WriteQuestion />} />
              <Route path="/articles/modify/:_id" element={<ModifyQuestion />} />
              {/* <Route path="/articles/:id/bookmark" element={<Detail />} /> */}
            </Route>
            <Route path="/replies" element={<Layout />}>
              <Route index element={<Replies />} />
            </Route>
            <Route path="/search" element={<Layout />}>
              <Route index element={<SearchPage />} />
              <Route path="/search/hashtag" element={<SearchTagPage />} />
            </Route>
            <Route path="/mypage" element={<Layout />}>
              <Route index path="/mypage" element={<MyPageQuestion />} />
              <Route path="/mypage/answers" element={<MyPageAnswer />} />
              <Route path="/mypage/comments" element={<MyPageComment />} />
              <Route path="/mypage/bookmarks/questions" element={<MyPageQuestion />} />
              <Route path="/mypage/bookmarks/answers" element={<MyPageAnswer />} />
              <Route path="/mypage/bookmarks/comments" element={<MyPageComment />} />
            </Route>
          </Routes>
        </BrowserRouter>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
