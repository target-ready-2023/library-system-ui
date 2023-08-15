import React, { useEffect, useState } from "react";
import { Button, Snackbar, Alert, IconButton} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteButton = ({ item, updateData}) => {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleCloseConfirmation = () => {
    setDialogOpen(false);
  };

  const deleteBook = (book_id) => {
    const deleteApiUrl = `http://localhost:8081/library_system/v1/book/${book_id}`;

    fetch(deleteApiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Book deleted successfully.");
        setSnackbarMessage("Book Deleted successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setData((prevData) =>
          prevData.filter((book) => book.book_id !== book_id)
        );
        setDrawerOpen(false);
        updateData();
      })
      .catch((error) => {
        console.error("Error deleting the book:", error.message);
        setSnackbarMessage("Error deleting Book");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
      handleCloseConfirmation();
  };

  const handleDelete = () => {
    if (!item) {
      console.error("No book selected for delete.");
      return;
    }
    setDialogOpen(true);
 
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <IconButton color="primary" title = {"Delete Book"} onClick={handleDelete}>
        <Delete />
      </IconButton>

      <Dialog open={isDialogOpen} onClose={handleCloseConfirmation}>
      <DialogTitle>Are you sure you want to delete this book?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseConfirmation} color="primary">
          No
        </Button>
        <Button onClick={() =>deleteBook(item.book_id)} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DeleteButton;