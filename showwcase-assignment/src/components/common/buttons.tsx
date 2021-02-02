import React from "react";
import styled, { css } from "styled-components";

export interface ButtonProps {
  fontSize?: number;
  primary?: boolean;
  disabled?: boolean;
  warning?: boolean;
  danger?: boolean;
  success?: boolean;
  type?: 'button' | 'submit';
  onClick: (T: any) => void;
}

export const StyledButton = styled.button`
  padding: 15px;
  font-size: ${(props: ButtonProps) => props.fontSize + "px" ?? "18px"};
  font-family: monospace;
  color: #fff;
  outline: none;
  border: none;
  background-color: #3d3b3b;
  ${(props: ButtonProps) =>
    props.primary &&
    css`
      color: #f2f2f2;
      background-color: #5464f3;
    `};
  ${(props: ButtonProps) =>
    props.warning &&
    css`
      background-color: #f8b538;
    `};
  ${(props: ButtonProps) =>
    props.danger &&
    css`
      background-color: #f32d2d;
      width: 80px !important;
    `};
  ${(props: ButtonProps) =>
    props.success &&
    css`
      background-color: #2c9e2c;
    `}
  ${(props: ButtonProps) =>
    props.disabled &&
    css`
      background-color: #cccccc;
      color: #666666;
    `}
`;

const Buttons: React.FC<ButtonProps> = (props) => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

export default Buttons;
