import styled, { keyframes } from 'styled-components';
import loadingImg from 'assets/icon/loading.svg';

export const LoadingSection = styled.div<{ width?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => (props.width ? props.width : '683px')};
  height: 30px;
  margin: 20px 0 40px 0;
`;

// 회전하는 애니메이션 정의
const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingIcon = styled.img.attrs({
  src: loadingImg,
})`
  width: 24px;
  height: 24px;
  animation: ${rotateAnimation} 1s linear infinite;
`;
