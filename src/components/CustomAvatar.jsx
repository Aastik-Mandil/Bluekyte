import React from "react";
import { Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    "&.MuiAvatar-root": {
      backgroundColor: `rgb(25, 118, 210) !important`,
      color: `#ffffff !important`,
    },
  },
  small: {
    "&.MuiAvatar-root": {
      height: 26,
      width: 26,
      fontSize: 12,
    },
  },
  default: {
    "&.MuiAvatar-root": {
      height: 32,
      width: 32,
      fontSize: 12,
    },
  },
}));

export const nameShorten = (name) => {
  var splittedName = [""];
  if (name) {
    splittedName = name.trim().split(",")[0].split(" ");
  }
  return splittedName.length > 1
    ? `${splittedName[0][0]}${
        splittedName[splittedName.length - 1][0]
      }`
    : splittedName[0].length > 0
    ? `${splittedName[0][0]}`
    : "";
};

function CustomAvatar(props) {
  const classes = useStyles();

  return (
    <Avatar
      {...props}
      src={props.src}
      className={`${classes.avatar} ${props?.className} ${
        classes[props?.size] || classes.default
      }`}
      sx={props.sx && props.sx}
    >
      {nameShorten(props.name).toUpperCase()}
    </Avatar>
  );
}

function generateBG(value) {
  var hash = 0,
    r = 0,
    g = 0,
    b = 0;
  var i, charASCII;
  for (i = 0; i < value.length; i++) {
    charASCII = value.charCodeAt(i);
    hash += charASCII;
    if (i % 3 === 0) {
      r += charASCII;
    } else if ((i - 1) % 3 === 0) {
      g += charASCII;
    } else {
      b += charASCII;
    }
  }
  var R = Number((hash * r) % 255)
    .toString(16)
    .padEnd(2, "0");
  var G = Number((hash * g) % 255)
    .toString(16)
    .padEnd(2, "0");
  var B = Number((hash * b) % 255)
    .toString(16)
    .padEnd(2, "0");
  var hashCode = "#" + R + G + B;
  return hashCode;
}
export default CustomAvatar;
