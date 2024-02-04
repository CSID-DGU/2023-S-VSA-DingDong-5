import styled, { css } from 'styled-components';

const customMargin = css<{ top?: string; right?: string; bottom?: string; left?: string }>`
  margin: ${props => props.top || '0'} ${props => props.right || '0'} ${props => props.bottom || '0'}
    ${props => props.left || '0'};
`;

interface IButton {
  width?: string;
  height?: string;
  borderradius?: string;
  margin?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  fontsize?: string;
}

export const Button = styled.button<IButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  width: ${props => props.width || '100px'};
  height: ${props => props.height || '44px'};
  border-radius: ${props => props.borderradius || '10px'};
  margin: ${props => props.margin || '0'};
  background: #7c3aed;
  color: #fff;
  font-size: ${props => props.fontsize || '17px'};
  letter-spacing: 0.3px;
  transition: 0.1s;
  &:hover {
    background: #6d28d9;
  }
  ${customMargin}
`;
