import React, { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import {Snackbar, Alert, IconButton} from "@mui/material";

const IssueButton = ({ item, updateBookCount }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const IssueBook = (book_id, student_id) => {
    const issueApiUrl = `http://localhost:8081/library_system/v1/inventory/issue/book/${book_id}/${student_id}`;

    fetch(issueApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
  };

  const handleIssue = () => {
    if (!item) {
      console.error("No book selected for Issue.");
      // Handle error or show snackbar
      return;
    }
    IssueBook(item.book_id, 1);
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




