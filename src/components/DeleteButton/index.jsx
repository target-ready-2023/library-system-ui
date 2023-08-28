import React, { useEffect, useState } from "react";
import { Button, Snackbar, Alert, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

const DeleteButton = ({ item, updateData, showSnackbar }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [data, setData] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseConfirmation = () => {
    setDialogOpen(false);
  };

  const deleteBook = (book_id) => {
    const deleteApiUrl = `http://localhost:8081/library_system/v1/books/${book_id}`;

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
        showSnackbar("Book Deleted Successfully!", "success");

        setData((prevData) =>
          prevData.filter((book) => book.book_id !== book_id)
        );

        updateData();
        // navigate("/home");
      })
      .catch((error) => {
        console.error("Error deleting the book:", error.message);
        showSnackbar("Error deleting the book:", "error");
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
      <IconButton color="primary" title={"Delete Book"} onClick={handleDelete}>
        <Delete />
      </IconButton>

      <Dialog open={isDialogOpen} onClose={handleCloseConfirmation}>
        <DialogTitle sx={{ fontWeight: "bold", fontFamily: "Arial" }}>
          Are you sure you want to delete this book?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseConfirmation}
            style={{ backgroundColor: "grey" }}
            variant="contained"
            color="primary"
          >
            No
          </Button>
          <Button
            onClick={() => deleteBook(item.book_id)}
            variant="contained"
            color="primary"
            style={{ marginRight: "10px", backgroundColor: "#6c88c8" }}
          >
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
