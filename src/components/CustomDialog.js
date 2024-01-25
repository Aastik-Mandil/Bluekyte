import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  customDialogTitle: {
    borderBottom: "1px solid rgb(198,198,198)",
  },
  customDialogTitleLabel: {
    fontWeight: "bold",
  },
  customDialogContent: {
    height: "100%",
    maxHeight: "70vh",
  },
}));

function CustomDialog({
  title,
  children,
  open,
  onClose,
  scroll = "paper",
  dialogActions = <></>,
  ...others
}) {
  const classes = useStyles();
  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } =
        descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={(e, reason) => {
        if (reason === "backdropClick") {
          return;
        }
        onClose();
      }}
      scroll={scroll}
      aria-labelledby="action-dialog"
      aria-describedby="action-dialog-description"
      {...others}
    >
      <DialogTitle
        id="action-dialog"
        className={classes.customDialogTitle}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          {title && (
            <Typography
              variant="body1"
              className={classes.customDialogTitleLabel}
              noWrap
              color="text.primary"
            >
              {title}
            </Typography>
          )}

          {onClose && (
            <IconButton
              onClick={() => {
                onClose();
              }}
            >
              <MdClose />
            </IconButton>
          )}
        </Stack>
      </DialogTitle>

      {children && (
        <DialogContent
          className={`${classes.customDialogContent} onBoardingScroll`}
        >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            style={{ height: "100%" }}
          >
            {children}
          </DialogContentText>
        </DialogContent>
      )}

      {dialogActions && (
        <DialogActions
          style={{ paddingRight: 25, padding: 16 }}
        >
          {dialogActions}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default CustomDialog;
