import React from "react";
import { Typography } from "@mui/material";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HtmlTooltip } from "../Utility/customTheme";

function CustomInputLabel(props) {
  return (
    <Typography
      sx={{
        fontSize: "14px",
        fontWeight: 400,
        display: "flex",
        alignItems: "center",
      }}
      className="label-color"
      gutterBottom
      {...props}
    >
      {props?.children && props?.children}

      {props?.required && (
        <span
          // className={"text-red-600"}
          style={{ color: "red" }}
        >
          {" *"}
        </span>
      )}

      {props?.information && (
        <span
          style={{
            marginLeft: 4,
            color: "#367CFF",
          }}
        >
          <HtmlTooltip
            title={
              <>
                <Typography>
                  {props?.information}
                </Typography>
              </>
            }
            placement="right-start"
          >
            <div>
              <AiOutlineInfoCircle
                style={{ marginTop: 6 }}
                className={`mt-1.5 `}
              />
            </div>
          </HtmlTooltip>
        </span>
      )}
    </Typography>
  );
}

export default CustomInputLabel;
