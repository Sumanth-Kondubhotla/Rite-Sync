import styled, { css } from "styled-components";

const Button = styled.button<{ $primary?: boolean }>`
  cursor: pointer;
  display: inline-flex;
  padding: 11px 16px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
  border: none;
  font-family: "Open Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;

  ${(props) =>
    props.$primary &&
    css`
      background: #006aa2;
      color: #fff;
    `}
`;

export default Button;
