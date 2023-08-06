import React, { useEffect, useState } from "react";
import { Button, Snackbar, Alert, IconButton} from "@mui/material";
import { Delete } from "@mui/icons-material";

const DeleteButton = ({ item, refreshScreen}) => {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
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
        refreshScreen();
      })
      .catch((error) => {
        console.error("Error deleting the book:", error.message);
        setSnackbarMessage("Error deleting Book");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const handleDelete = () => {
    if (!item) {
      console.error("No book selected for delete.");
      // Handle error or show snackbar
      return;
    }
    deleteBook(item.book_id);
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
