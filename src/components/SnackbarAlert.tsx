import { Alert, Snackbar } from "@mui/material";

interface SnackbarAlertProps {
  open: boolean;
  onClose: () => void;
}

export default function SnackbarAlert({ open, onClose }: SnackbarAlertProps) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity="success">
        Operation completed successfully!
      </Alert>
    </Snackbar>
  );
}
