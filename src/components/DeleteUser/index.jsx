import { Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Button, Snackbar, Alert, IconButton} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteUser = ({ user}) => {
    
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleCloseConfirmation = () => {
    setDialogOpen(false);
  };

  const deleteUsers = (user_id) => {
    const deleteApiUrl = `http://localhost:8081/library_system/v3/delete/user/${user_id}`;
    fetch(deleteApiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response)
        if(response.status===409){
            console.log("user cannot be deleted")
            setSnackbarMessage("User Canoot be Deleted Untill User returns the book!");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
        else{
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            console.log("User deleted successfully.");
            setSnackbarMessage("User Deleted successfully!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            setData((prevData) =>
              prevData.filter((user) => user.user_id !== user_id)
            );
            setDrawerOpen(false);
        }
      })
      .catch((error) => {
        console.error("Error deleting the user:", error.message);
        setSnackbarMessage("Error deleting user");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
      handleCloseConfirmation();
  };

  const handleDelete = () => {
    if (!user) {
      console.error("No User selected for delete.");
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
      <IconButton color="primary" title = {"Delete User"} onClick={handleDelete}>
        <Delete />
      </IconButton>

      <Dialog open={isDialogOpen} onClose={handleCloseConfirmation}>
      <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseConfirmation} color="primary">
          No
        </Button>
        <Button onClick={() =>deleteUsers(user.user_id)} color="primary" autoFocus>
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

   
}
export default DeleteUser;