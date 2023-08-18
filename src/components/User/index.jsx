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
import { useLocation, useNavigate } from "react-router-dom";

const User = (data) => {
  const [users, setUsers] = useState([]);
  const [bookUser, setBookUser] = useState([]);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [currentPage, setCurrentPage] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const recordsPerPage = 5;
  const nPage = Math.ceil(userCount / recordsPerPage);

  localStorage.setItem("limit", userCount);

  const location = useLocation();
  const navigate = useNavigate();
  const [openDialogs, setOpenDialogs] = useState(
    Array(data?.length).fill(false)
  );
  const toSentenceCase = (str) => {
    if (typeof str !== "string") return "";

    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log("page " + currentPage);
  };

  const dataWithSerialNumber = users?.map((user, index) => ({
    ...user,
    serialNumber: currentPage * 5 + (index + 1),
    user_role: toSentenceCase(user.user_role),
  }));

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "white",
    padding: theme.spacing(1),
    textAlign: "center",
    color: "black",
  }));

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/library_system/v3/users?page_number=${currentPage}`
      );

      setUsers(response.data);
      console.log(response.data);
      const responseUser = await axios.get(
        `http://localhost:8081/library_system/v3/users/total_count`
      );
      setUserCount(responseUser.data);
    } catch (error) {
      console.error(error);
      navigate("/notfound");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, location]);

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
  const dialogContentStyles = {
    maxHeight: "400px",
    overflowY: "scroll",
  };

  const bookListStyles = {
    paddingLeft: "0px",
    listStyleType: "none",
    marginBottom: 0,
    fontSize: 17,
  };

  const bookListItemStyles = {
    borderBottom: "1px solid #ddd",
    padding: "5px",
  };

  const actionButtonsStyles = {
    display: "flex",
    justifyContent: "right",
    gap: "0.25px",
  };

  return (
    <>
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

      <Card className="App-Card">
        <h3 sx={{ fontWeight: "bold", fontFamily: "Arial" }}>USER DIRECTORY</h3>
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
              {dataWithSerialNumber.map((user, index) => (
                <TableRow key={user.user_id}>
                  <TableCell align="center">{user.serialNumber}</TableCell>
                  <TableCell align="center">{user.user_name}</TableCell>
                  <TableCell align="center">{user.user_role}</TableCell>
                  <TableCell align="center" style={tdStyles}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => handleOpen(index, user.user_id)}
                        color="primary"
                        title={"Books issued by user"}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteUser user={user} />
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
                      <DialogTitle
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          fontFamily: "Arial",
                          textDecoration: "underline",
                        }}
                      >
                        BOOKS ISSUED BY USER
                      </DialogTitle>
                      <DialogContent style={dialogContentStyles}>
                        {bookUser[user.user_id]?.length ? (
                          <ul style={bookListStyles}>
                            {bookUser[user.user_id].map((bookName, idx) => (
                              <li key={idx} style={bookListItemStyles}>
                                <span style={{ fontWeight: "bold" }}>{`${
                                  idx + 1
                                }.`}</span>{" "}
                                {bookName}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p style={{ color: "red", fontWeight: "bold" }}>
                            No issued books
                          </p>
                        )}
                      </DialogContent>

                      <DialogActions>
                        <Button
                          onClick={() => handleClose(index)}
                          style={{
                            backgroundColor: "grey",
                          }}
                          variant="contained"
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
        <ul className="pagination">
          <li className="page-item">
            <a
              href="#"
              className="page-link"
              onClick={() => {
                if (currentPage > 0) changePage(currentPage - 1);
              }}
            >
              previous
            </a>
          </li>

          <li className={`page-item `}>
            <a
              href="#"
              className="page-link"
              onClick={() => changePage(currentPage)}
            >
              {currentPage + 1}
            </a>
          </li>

          <li className="page-item">
            <a
              href="#"
              className="page-link"
              onClick={() => {
                if (currentPage < nPage - 1) changePage(currentPage + 1);
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </Card>
    </>
  );
};

export default User;
