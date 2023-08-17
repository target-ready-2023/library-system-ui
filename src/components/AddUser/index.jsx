import React, { useState } from "react";
import axios from "axios";

import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddUser = ({ handleCloseDialog, setSnackbarProps }) => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate=useNavigate();
  const handleAddUser = async () => {
    if (!userId || !userName || !userRole) {
 // Check if any required field is empty
        setSnackbarProps.setOpen(true);
        setSnackbarProps.setMessage("Please fill in all fields.");
        setSnackbarProps.setSeverity("error");
        return;
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

      const newUser = response.data;

      handleCloseDialog(newUser);
      setSnackbarProps.setOpen(true);
      setSnackbarProps.setMessage("User added successfully!");
      setSnackbarProps.setSeverity("success");
    } catch (error) {
      console.error("Error adding user:", error);
      if (error.response && error.response.status === 409) {
        const errorMessage = error.response.data.message;
        setSnackbarProps.setOpen(true);
      setSnackbarProps.setMessage(errorMessage); 
      setSnackbarProps.setSeverity("error");
      } else {
        console.error("Error adding user:", error);
      }
    }
    navigate("/");
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
        <InputLabel>User Role</InputLabel>
        <Select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="librarian">Librarian</MenuItem>
        </Select>
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
