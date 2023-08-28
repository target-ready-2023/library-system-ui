import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Snackbar, Alert } from "@mui/material";
import { useContext } from "react";
import UserContext from "../UserContext";

const ReturnButton = ({ item, updateBookCount }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  // const { userId,setUserId } = useContext(UserContext);
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  const handleCloseConfirmation = () => {
    setDialogOpen(false);
  };
  const ReturnBook = (book_id, student_id) => {
    const returnApiUrl = `http://localhost:8081/library_system/v1/inventory/return/book`;
    const returnData = {
      book_id: book_id,
      student_id: userId,
    };

    fetch(returnApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(returnData),
    })
      .then(async (response) => {
        const responseData = await response.json();
        console.log("response data " + responseData);
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        return responseData;
      })
      .then((responseData) => {
        console.log("Book Returned successfully:", responseData);
        setSnackbarMessage(`Book returned successfully by ${userName}!`);
        console.log(responseData);
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setData((prevData) =>
          prevData.filter((book) => book.book_id !== book_id)
        );
        setDrawerOpen(false);
        updateBookCount(book_id);
      })

      .catch((error) => {
        if (error.message) {
          console.log("Error message:", error.message);
          setSnackbarMessage(error.message);
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        } else {
          console.error("An unknown error occurred:", error);
          setSnackbarMessage(error);
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        }
      });
    setDialogOpen(false);
  };

  const handleReturn = () => {
    if (!item) {
      console.error("No book selected for Return.");

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
      {/* <Button className="issue-button" onClick={handleIssue}>
        <Delete />
      </Button> */}
      <IconButton color="primary" title={"Return Book"} onClick={handleReturn}>
        <RemoveCircleOutlineIcon />
      </IconButton>
      <Dialog open={isDialogOpen} onClose={handleCloseConfirmation}>
        <DialogTitle sx={{ fontWeight: "bold", fontFamily: "Arial" }}>
          Do you wish you return this book?
        </DialogTitle>
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
            onClick={() => ReturnBook(item.book_id, 2)}
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

export default ReturnButton;
