import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
 Snackbar,
  Alert 
} from "@mui/material";
import AddUser from "../AddUser";
import DeleteUser from "../DeleteUser";

const User = () => {
  const [users, setUsers] = useState([]);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/library_system/v3/users`
      );

      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleOpenAddUserDialog = () => {
    setOpenAddUserDialog(true);
  };

  const handleCloseAddUserDialog = () => {
    setOpenAddUserDialog(false);
  };

  const containerStyles = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "16px",
    marginRight: "200px"
  };

  const tableContainerStyles = {
    maxWidth: "1000px",
    margin: "0 auto",
    borderRadius: "10px",
    overflow: "hidden",
  };

  const tableStyles = {
    width: "100%",
    tableLayout: "fixed",
  };

  const tableHeaderCellStyles = {
    backgroundColor: "#f2f2f2",
    borderBottom: "1px solid #ddd",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "12px",
    textAlign: "center",
  };

  const tdStyles = {
    borderBottom: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
    fontSize: "16px",
  };

  const actionButtonsStyles = {
    display: "flex",
    justifyContent: "right",
    gap: "0.25px",
  };

  return (
    <Card className="App-Card">
      <h3>User directory</h3>
      <div style={containerStyles}>
      <Button variant="contained" onClick={handleOpenAddUserDialog}>
        Add User
      </Button>
      </div>
      <TableContainer component={Paper} style={tableContainerStyles}>
        <Table style={tableStyles}>
          <TableHead>
            <TableRow>
              <TableCell style={tableHeaderCellStyles} align="center">
                No.
              </TableCell>
              <TableCell style={tableHeaderCellStyles} align="center">
                User Name
              </TableCell>
              <TableCell style={tableHeaderCellStyles} align="center">
                Role
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#f2f2f2",
                  borderBottom: "1px solid #ddd",
                  fontSize: "18px",
                  fontWeight: "bold",
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.user_id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{user.user_name}</TableCell>
                <TableCell align="center">{user.user_role}</TableCell>
                <TableCell align="right" style={tdStyles}>
                  <div style={actionButtonsStyles}>
                    {/* <IconButton>
                      <AddUser />
                    </IconButton> */}
                    <IconButton>
                      <DeleteUser user={user}/>
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      

      <Dialog open={openAddUserDialog} onClose={handleCloseAddUserDialog}>
        <AddUser handleCloseDialog={handleCloseAddUserDialog}
        setSnackbarProps={{
          setOpen: setSnackbarOpen,
          setMessage: setSnackbarMessage,
          setSeverity: setSnackbarSeverity,
        }} />
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={8000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default User;
