import styled from 'styled-components';
import HashTagIcon from '../../assets/icon/hashtag.svg';

export const QuestionForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 683px;
  height: 800px;
  /* margin-right: 240px; */
  /* margin-right: 180px; */
`;

export const QuestionTitleSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
`;

export const QuestionTypo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: #7c3aed;
  border-radius: 50%;
  font-family: 'Inter', sans-serif;
  color: #fff;
  font-size: 26px;
  font-weight: 600;
`;

export const QuestionTitleInput = styled.input`
  width: 617px;
  height: 50px;
  border-bottom: 1px solid #e2e8f0;
  background: #fff;
  font-size: 17px;
  /* font-weight: 500; */
  padding-left: 10px;
  margin-left: 15px;
`;

export const QuestionKeywordSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  /* max-height: 50px; */
  margin-top: 5px;
  margin-bottom: 30px;
`;

export const HashtagIcon = styled.img.attrs({
  src: HashTagIcon,
})`
  width: 27px;
  height: 50px;
`;

export const KeywordInput = styled.input`
  align-self: end;
  width: 655px;
  height: 45px;
  border-bottom: 1px solid #e2e8f0;
  background: #fff;
  font-size: 16px;
  /* font-weight: 500; */
  padding-left: 15px;
  padding-bottom: 5px;
`;

/* export const QuestionSubmitButton = styled.button.attrs({
  type: "submit",
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  width: 100px;
  height: 44px;
  border-radius: 10px;
  background: #7c3aed;
  flex-shrink: 0;
  color: #fff;
  font-size: 17px;
  letter-spacing: 0.3px;
  margin-top: 30px;
  transition: 0.1s;
  &:hover {
    background: #6d28d9;
  }
`; */
