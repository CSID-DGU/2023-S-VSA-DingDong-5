import styled, { css } from 'styled-components';
// import logo from 'assets/icon/logo.svg';
// import facebookImg from 'assets/icon/facebook.svg';
// import instagramImg from 'assets/icon/instagram.svg';
// import twitterImg from 'assets/icon/twitter.svg';
// import youtubeImg from 'assets/icon/youtube.svg';
import logo from '../../assets/icon/logo.svg';
import facebookImg from '../../assets/icon/facebook.svg';
import instagramImg from '../../assets/icon/instagram.svg';
import twitterImg from '../../assets/icon/twitter.svg';
import youtubeImg from '../../assets/icon/youtube.svg';

interface ICustomMargin {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

interface ILink {
  underline?: string;
  pointer?: string;
  weight?: number;
}

const customMargin = (props: ICustomMargin) => css`
  margin: ${props.top || '0px'} ${props.right || '0px'} ${props.bottom || '0px'} ${props.left || '0px'};
`;

export const InformationRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  width: 1200px;
  height: 300px;
  padding: 30px 60px 10px 60px;
  margin-top: 20px;
  color: #475569;
`;

export const UpperContainer = styled.div`
  display: flex;
  /* gap: 80px; */
`;

export const GiveRunContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 323px;
`;

export const LogoSection = styled.div`
  display: flex;
  width: 136px;
  height: 35px;
  justify-content: center;
  align-items: center;
  /* padding-right: 25px; */
  /* margin-right: 50px; */
`;

export const LogoImg = styled.img.attrs({
  src: logo,
})`
  width: 24px;
  height: 24px;
`;

export const LogoTypo = styled.div`
  color: #7c3aed;
  text-align: right;
  font-family: 'Inter';
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -1px;
`;

export const Typo = styled.div<ILink & ICustomMargin>`
  font-size: 14px;
  font-weight: ${props => (props.weight ? props.weight : 400)};
  cursor: ${props => (props.pointer ? 'pointer' : 'default')};
  &:hover {
    text-decoration-line: ${props => (props.underline ? 'underline' : 'none')};
  }
  ${props => customMargin(props)}; // Apply customMargin
`;

export const Title = styled.div<ILink & ICustomMargin>`
  font-size: 18px;
  font-weight: 500;
  cursor: ${props => (props.pointer ? 'pointer' : 'default')};
  ${props => customMargin(props)}; // Apply customMargin  cursor: ${props => (props.pointer ? 'pointer' : 'default')};
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 340px;
`;

export const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  > * {
    flex-basis: 50%;
  }
`;

export const DingDongContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LowerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 120px;
  gap: 42px;
`;

export const SNSContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  margin-left: auto;
`;

export const FacebookImg = styled.img.attrs<ILink>({
  src: facebookImg,
  alt: 'facebook',
})`
  width: 16px;
  height: 15px;
  cursor: pointer;
`;

export const YoutubeImg = styled.img.attrs<ILink>({
  src: youtubeImg,
  alt: 'youtube',
})`
  width: 15px;
  height: 10px;
  cursor: pointer;
`;

export const TwitterImg = styled.img.attrs<ILink>({
  src: twitterImg,
  alt: 'twitter',
})`
  width: 15px;
  height: 11px;
  cursor: pointer;
`;

export const InstagramImg = styled.img.attrs<ILink>({
  src: instagramImg,
  alt: 'instagram',
})`
  width: 13px;
  height: 12px;
  cursor: pointer;
`;
