import React from "react";
import { makeStyles } from "@mui/styles";
import { BeatLoader } from "react-spinners";

const useStyle = makeStyles((theme) => ({
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: "50",
  },
}));

function Loading({ load }) {
  const classes = useStyle();

  return load ? (
    <div className={classes.loadingContainer}>
      <BeatLoader />
    </div>
  ) : null;
}

export default Loading;
