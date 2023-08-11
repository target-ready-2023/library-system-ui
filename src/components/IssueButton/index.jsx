import React, { useEffect, useState } from "react";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import {Button,Snackbar, Alert, IconButton} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const IssueButton = ({ item, updateBookCount }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleCloseConfirmation = () => {
    setDialogOpen(false);
  };

  const IssueBook = (book_id, student_id) => {
    const issueApiUrl = `http://localhost:8081/library_system/v1/inventory/issue/book`;

    const issueData = {
      book_id: book_id,
      student_id: student_id,
    };

    fetch(issueApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issueData),  
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok"); 
        }
        console.log("Book Issued successfully.");
        setSnackbarMessage("Book Issued successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setData((prevData) =>
          prevData.filter((book) => book.book_id !== book_id)
        );
        setDrawerOpen(false);
        updateBookCount(book_id);
      })
      .catch((error) => {
        console.error("Error Issuing the book:", error.message);
        setSnackbarMessage("Error Issuing Book");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
      setDialogOpen(false);
  };

  const handleIssue = () => {
    if (!item) {
      console.error("No book selected for Issue.");
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
      <IconButton color="primary" title = {"Issue Book"} onClick={handleIssue}>
              <LibraryAddIcon />
      </IconButton>

      <Dialog open={isDialogOpen} onClose={handleCloseConfirmation}>
      <DialogTitle>Do you wish to take this book?</DialogTitle>
      <DialogActions>
        <Button onClick={handleCloseConfirmation} color="primary">
          No
        </Button>
        <Button onClick={() =>IssueBook(item.book_id, 2)} color="primary" autoFocus>
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

export default IssueButton;




