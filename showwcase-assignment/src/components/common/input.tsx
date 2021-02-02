import React from "react";
import styled from "styled-components";

export const StyledInput = styled.input`
  padding: 10px;
  width: auto;
  margin: ${(props: InputProps) => props.margin ?? "0"};
`;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "custom-label": React.DetailedHTMLProps<
        React.LabelHTMLAttributes<HTMLLabelElement>,
        HTMLLabelElement
      >;
    }
  }
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <>
      {props.label && (
        <>
          <custom-label>{props.label}</custom-label>
        </>
      )}
      <StyledInput {...props} />
    </>
  );
};

interface InputProps {
  id: string;
  name: string;
  placeholder?: string;
  defaultValue?: string | number;
  value?: string | number;
  type: string;
  margin?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: any;
}

export default Input;
