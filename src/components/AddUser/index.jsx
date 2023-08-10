import React, { useState } from "react";
import axios from "axios";

import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const AddUser = ({ handleCloseDialog,setSnackbarProps }) => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");


  const handleAddUser = async () => {
    if (!userId || !userName || !userRole) {
        // Check if any required field is empty
        setSnackbarProps.setOpen(true);
        setSnackbarProps.setMessage("Please fill in all fields.");
        setSnackbarProps.setSeverity("error");
        return; // Do not proceed with submission
      }
    try {
      const response = await axios.post(
        "http://localhost:8081/library_system/v3/student",
        {
          user_id: userId,
          user_name: userName,
          user_role: userRole,
        }
      );

      // Assuming the response includes the newly added user data
      const newUser = response.data;

      // Close the dialog and pass the new user data to the parent component
      handleCloseDialog(newUser);
      setSnackbarProps.setOpen(true);
      setSnackbarProps.setMessage("User added successfully!");
      setSnackbarProps.setSeverity("success");
    
    } catch (error) {
      console.error("Error adding user:", error);
      if (error.response && error.response.status === 409) {
      // User already exists error
      const errorMessage = error.response.data.message; // Use the error message from the response
      setSnackbarProps.setOpen(true);
      setSnackbarProps.setMessage(errorMessage); // Use the error message from the response
      setSnackbarProps.setSeverity("error");
    } else {
      console.error("Error adding user:", error);
    }
    }
  };

 

  return (
    <>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <TextField
          label="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="User Role"
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddUser} color="primary">
          Add
        </Button>
      </DialogActions>
      
    </>
  );
};

export default AddUser;
