import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarComponent = ({
  openSnackbar,
  handleCloseSnackbar,
  snackbarMessage,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
    >
      <Alert onClose={handleCloseSnackbar} sx={{ width: "100%" }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
