import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Li, DotBox } from './styled';
import styled from 'styled-components';
import { border } from '@mui/system';

const CustomArrowsContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CustomArrow = styled.div`
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  background-color: #a78bfa;
  top: 50%;
  border-radius: 50%;
  color: white;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    background-color: #7c3aed;
  }
`;

interface CustomArrowProps {
  onClickHandler: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  label: string;
}

interface CustomDot {
  clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void;
  isSelected: boolean;
  index: number;
  label: string;
}

export const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClickHandler, hasPrev }) => {
  if (!hasPrev) return null;
  return (
    <CustomArrowsContainer style={{ left: '0' }}>
      <CustomArrow onClick={onClickHandler} className="arrow-prev">
        &lt;
      </CustomArrow>
    </CustomArrowsContainer>
  );
};

export const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClickHandler, hasNext, label }) => {
  if (!hasNext) return null;
  return (
    <CustomArrowsContainer style={{ right: '0' }}>
      <CustomArrow onClick={onClickHandler} className="arrow-next">
        &gt;
      </CustomArrow>
    </CustomArrowsContainer>
  );
};

export const CustomDotStyle: React.FC<CustomDot> = ({ clickHandler, isSelected, index, label }) => {
  const indicatorStyles = {
    background: '#fff',
    width: 8,
    height: 8,
    display: 'inline-block',
    margin: '0 8px',
  };

  if (isSelected) {
    return (
      //<DotBox>
      <Li
        style={{ ...indicatorStyles, background: '#8C28FF', border: '0' }}
        aria-label={`Selected: ${label} ${index + 1}`}
        title={`Selected: ${label} ${index + 1}`}
      />
      //</DotBox>
    );
  }
  return (
    // <DotBox>
    <Li
      style={{ ...indicatorStyles, border: '0' }}
      onClick={clickHandler}
      onKeyDown={clickHandler}
      value={index}
      key={index}
      role="button"
      tabIndex={0}
      title={`${label} ${index + 1}`}
      aria-label={`${label} ${index + 1}`}
    />
    //</DotBox>
  );
};
