import styled from "@emotion/styled";
import { Theme } from "@mui/material";
interface StyledButtonProps {
  theme?: Theme;
  variant?: string;
}

const Button = styled.button<StyledButtonProps>(
  ({ theme, variant = "primary" }) => ({
    cursor: "pointer",
    display: "inline-flex",
    padding: "11px 16px",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    borderRadius: "8px",
    border: "none",
    fontFamily: "Open Sans",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "20px",
    background:
      variant === "primary"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    color: variant === "primary" ? "#fff" : "black",
  })
);

export default Button;
