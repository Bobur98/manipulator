import { Alert, Snackbar } from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";
import { SetStateAction } from "react";

interface SnackbarAlertProps {
  snackbarOpen: boolean;
  setSnackbarOpen: any;
}

export default function SnackbarAlert({
  snackbarOpen,
  setSnackbarOpen,
}: SnackbarAlertProps) {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={5000}
      onClose={() => setSnackbarOpen(false)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={() => setSnackbarOpen(false)} severity="success">
        Task completed successfully!
      </Alert>
    </Snackbar>
  );
}
