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
  Alert,
  Icon,
} from "@mui/material";
import DeleteUser from "../DeleteUser";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PeopleIcon from "@mui/icons-material/People";
// import Dialog from "@mui/material/Dialog";
// import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/material/styles";

const User = (data) => {
  const [users, setUsers] = useState([]);
  const [bookUser, setBookUser] = useState([]);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openDialogs, setOpenDialogs] = useState(
    Array(data?.length).fill(false)
  );
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "white",
    padding: theme.spacing(1),
    textAlign: "center",
    color: "black",
  }));

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

  const fetchBooksByUserId = async (user_id) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/library_system/v3/books/${user_id}`
      );
      setBookUser((prevBooks) => ({
        ...prevBooks,
        [user_id]: response.data,
      }));
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBookUser((prevBooks) => ({
        ...prevBooks,
        [user_id]: [],
      }));
    }
  };

  const handleOpen = (index, userId) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = true;
    setOpenDialogs(newOpenDialogs);
    console.log(userId);
    fetchBooksByUserId(userId);
  };

  const handleClose = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = false;
    setOpenDialogs(newOpenDialogs);
  };

  // const handleOpenAddUserDialog = () => {
  //   setOpenAddUserDialog(true);
  // };

  // const handleCloseAddUserDialog = () => {
  //   setOpenAddUserDialog(false);
  // };

  const containerStyles = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "16px",
    marginRight: "200px",
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
    <>
      <Item>
        <Icon>
          <PeopleIcon />
        </Icon>
        {/* <Button
          sx={{
            color: "black",
            fontSize: "12px",
            height: "30px",
            width: "70%",
            fontFamily: "Arial",
          }}
          onClick={handleUser}
        >
          Users
        </Button> */}
      </Item>
      <Card className="App-Card">
        <h3>User directory</h3>
        {/* <div style={containerStyles}>
          <Button variant="contained" onClick={handleOpenAddUserDialog}>
            Add User
          </Button>
        </div> */}
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
                  <TableCell align="center" style={tdStyles}>
                    <div style={actionButtonsStyles} align="center">
                      {/* <IconButton>
                      <AddUser />
                    </IconButton> */}
                      <IconButton>
                        <DeleteUser user={user} />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpen(index, user.user_id)}
                        color="primary"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </div>
                    <Dialog
                      open={openDialogs[index]}
                      onClose={() => handleClose(index)}
                      PaperProps={{
                        style: {
                          maxWidth: "500px",
                          width: "100%",
                          padding: "20px",
                        },
                      }}
                    >
                      <DialogTitle>Issued books:</DialogTitle>
                      <DialogContent>
                        <ul>
                          {bookUser[user.user_id]?.map((bookName, idx) => (
                            <li key={idx}>{bookName}</li>
                          ))}
                        </ul>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => handleClose(index)}
                          color="primary"
                        >
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <Dialog open={openAddUserDialog} onClose={handleCloseAddUserDialog}>
          <AddUser
            handleCloseDialog={handleCloseAddUserDialog}
            setSnackbarProps={{
              setOpen: setSnackbarOpen,
              setMessage: setSnackbarMessage,
              setSeverity: setSnackbarSeverity,
            }}
          />
        </Dialog> */}
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
    </>
  );
};

export default User;
