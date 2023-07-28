import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import type { QuestionDataType } from "../../stores/page-store";
import {
  HeartIcon,
  ItemContainer,
  ItemTypo,
  QuestionBodySection,
  QuestionTitle,
  QuestionTitleSection,
  QuestionTopContainer,
  QuestionTypo,
  SaveIcon,
  ContentTypo,
  QuestionBottomLeftContainer,
  QuestionBottomContainer,
  Typo,
  QuestionBottomRightContainer,
  AuthorBox,
  ViewDateContainer,
  AskedTypo,
  AuthorContainer,
  AuthorProfile,
  UserStateCircle,
  CommentContainer,
  HeartFillIcon,
} from "./styled";
import DOMPurify from "dompurify";
import axios from "axios";
export const AnswerForm = () => {
  return (
    <>
      <QuestionTitleSection style={{ marginTop: "45px" }}>
        <QuestionTypo>A</QuestionTypo>
        <QuestionTitle style={{ color: "#525458" }}>1개의 답변</QuestionTitle>
      </QuestionTitleSection>
      <QuestionBodySection>
        <QuestionTopContainer>
          <ItemContainer>
            <HeartIcon />
            <ItemTypo>1</ItemTypo>
            <SaveIcon />
            <ItemTypo>10</ItemTypo>
          </ItemContainer>
          <ItemContainer>
            <ViewDateContainer>
              {/* <Typo>조회수 {currentQuestion?.views}</Typo> */}
              <Typo>2023.07.28 08:14</Typo>
            </ViewDateContainer>
            <ContentTypo>
              제 경우에는 유럽 동부 물가가 생각보다 저렴해서 환전을 하고 가는
              것보다 직접 가서 환전하는 것을 추천드립니다.
            </ContentTypo>
          </ItemContainer>
        </QuestionTopContainer>
        <QuestionBottomContainer>
          <QuestionBottomLeftContainer>
            <Typo underline="true" pointer="true">
              공유
            </Typo>
            {/*             <Typo underline="true" pointer>
              수정
            </Typo>
            <Typo underline pointer onClick={deleteQuestion}>
              삭제
            </Typo> */}
          </QuestionBottomLeftContainer>
          <QuestionBottomRightContainer>
            <AuthorBox>
              <AskedTypo>Answered</AskedTypo>
              <AuthorContainer>
                <AuthorProfile>이슬</AuthorProfile>
                <UserStateCircle color="#ffd700" />
                <Typo>999+</Typo>
              </AuthorContainer>
            </AuthorBox>
          </QuestionBottomRightContainer>
        </QuestionBottomContainer>
        {/* <p>Answers: {currentQuestion?.answers}</p> */}
        {/*         <p>Hashtags: {currentQuestion?.hashtags}</p>
        <p>Created: {currentQuestion?.createdAt}</p> */}
        {/* <p>Updated: {currentQuestion?.updatedAt}</p> */}
      </QuestionBodySection>
    </>
  );
};
