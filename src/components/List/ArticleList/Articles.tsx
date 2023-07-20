import { useNavigate } from "react-router-dom";
import WhiteLogo from "../../../assets/icon/white_logo.svg";
import { ArticlesTable } from "../ArticlesTable/ArticlesTable";
import { Holder, Text, Span, Img, ArticleContainer } from "./styled";
import { Button } from "../../Button";
import { Pagination } from "../Pagination";

export const Articles = () => {
  const navigate = useNavigate();

  const onClickWrite = () => {
    navigate("/articles/write");
  };

  return (
    <>
      <Holder>
        <Text>최신순</Text>
        <Button width="123px" onClick={onClickWrite}>
          <Img src={WhiteLogo} />
          <Span>질문하기</Span>
        </Button>
      </Holder>
      <ArticleContainer>
        <ArticlesTable />
        {/* <Pagination /> */}
      </ArticleContainer>
    </>
  );
};