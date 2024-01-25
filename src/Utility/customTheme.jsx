import {
  Button,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const HtmlTooltip = styled(
  ({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    border: "1px solid #dadde9",
  },
}));

export const ColorButton = styled(Button)(() => ({
  color: "#000000",
  backgroundColor: "#7676801F",
  borderRadius: "7px",
}));
