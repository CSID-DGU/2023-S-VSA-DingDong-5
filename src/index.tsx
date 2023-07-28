import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import { Layout } from "./routes/Layout";
import { WriteQuestion } from "./pages/WriteQuestion";
import { List } from "./pages/List/List";
import { Home } from "./pages/Home/Home";
import { RecoilRoot } from "recoil";
import { Detail } from "./pages/Detail";
import { Replies } from "./pages/Replies";
import { ModifyQuestion } from "./pages/ModifyQuestion";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Layout />}>
            <Route index element={<List />} />
            <Route path="/articles/:id" element={<Detail />} />
            <Route path="/articles/write" element={<WriteQuestion />} />
            <Route path="/articles/modify/:id" element={<ModifyQuestion />} />
          </Route>
          <Route path="/replies" element={<Layout />}>
            <Route index element={<Replies />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
