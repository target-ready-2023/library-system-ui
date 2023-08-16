import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateButton from "../UpdateButton";
import DeleteButton from "../DeleteButton";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IssueButton from "../IssueButton";
import ReturnButton from "../ReturnButton";

const TableComponent = ({ data, currentPage, updateData }) => {
  const [openDialogs, setOpenDialogs] = useState(
    Array(data?.length).fill(false)
  );
  const [numberOfCopies, setNumberOfCopies] = useState([]);
  const [fetchDataFlag, setFetchDataFlag] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [bookCategories, setBookCategories] = useState({});

  // Step 1: Add state to store sorted book data
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    // Step 2: Sort the data by editing timestamp (replace with your criterion)
    const sortedBooks = data?.slice().sort((a, b) => {
      // Replace 'edited_timestamp' with the actual property containing editing timestamp
      return new Date(a.edited_timestamp) - new Date(b.edited_timestamp);
    });
    setSortedData(sortedBooks);
  }, [data]);

  
  const handleOpen = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = true;
    setOpenDialogs(newOpenDialogs);
  };

  const handleClose = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = false;
    setOpenDialogs(newOpenDialogs);
  };

  const dataWithSerialNumber = sortedData.map((item, index) => ({
    ...item,
    serialNumber: currentPage * 5 + (index + 1),
  }));
//   const dataWithSerialNumber = sortedData.map((item, index) => ({
//     ...item,
//     serialNumber: index + 1, // Start from 1 for the latest edited book
//   }));

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const fetchNumberOfCopies = async () => {
    const copiesData = {};
    for (const item of data) {
      try {
        const response = await axios.get(
          `http://localhost:8081/library_system/v1/book/no_of_copies/${item.book_id}`
        );
        copiesData[item.book_id] = response.data;
        fetchBookCategories(item.book_id);
      } catch (error) {
        copiesData[item.book_id] = "N/A";
      }
    }
    setNumberOfCopies(copiesData);
  };

  const fetchBookCategories = async (bookId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/library_system/v2/categories/${bookId}`
      );
      setBookCategories((prevCategories) => ({
        ...prevCategories,
        [bookId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      setBookCategories((prevCategories) => ({
        ...prevCategories,
        [bookId]: [],
      }));
    }
  };

  useEffect(() => {
    if (fetchDataFlag && data?.length > 0) {
      fetchNumberOfCopies();
      setFetchDataFlag(false);
    }
  }, [data, fetchDataFlag]);

  useEffect(() => {
    setFetchDataFlag(true);
  }, [data]);

  const updateBookCount = async (bookId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/library_system/v1/book/no_of_copies/${bookId}`
      );
      numberOfCopies[bookId] = response.data;
    } catch (error) {
      numberOfCopies[bookId] = "N/A";
    }
    setNumberOfCopies(JSON.parse(JSON.stringify(numberOfCopies)));
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
  const dialogStyles = {
    innerHeight: "200px",
    innerWidth: "400px",
  };

  return (
    <>
      <TableContainer component={Paper} style={tableContainerStyles}>
        <Table style={tableStyles}>
          <TableHead>
            <TableRow>
              <TableCell style={tableHeaderCellStyles} align="center">
                No.
              </TableCell>
              <TableCell style={tableHeaderCellStyles} align="center">
                Book Name
              </TableCell>
              <TableCell style={tableHeaderCellStyles} align="center">
                Author Name
              </TableCell>
              <TableCell style={tableHeaderCellStyles} align="center">
                Publication Year
              </TableCell>

              <TableCell
                style={{
                  backgroundColor: "#f2f2f2",
                  borderBottom: "1px solid #ddd",
                  fontSize: "18px",
                  fontWeight: "bold",
                  padding: "12px",
                  textAlign: "left",
                  width: "250px",
                }}
                //align="center"
              >
                Copies
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
            {dataWithSerialNumber?.map((item, index) => (
              <TableRow key={item.book_id}>
                <TableCell align="center">{item.serialNumber}</TableCell>
                <TableCell align="center">{item.book_name}</TableCell>
                <TableCell align="center">{item.author_name}</TableCell>
                <TableCell align="center">{item.publication_year}</TableCell>
                <TableCell align="left">
                  {numberOfCopies[item.book_id]}
                </TableCell>
                <TableCell align="right" style={tdStyles}>
                  <div style={actionButtonsStyles}>
                    <IconButton
                      onClick={() => handleOpen(index)}
                      color="primary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <UpdateButton item={item} showSnackbar={showSnackbar} />
                    <DeleteButton item={item} updateData={updateData} />
                    <IssueButton
                      item={item}
                      updateBookCount={updateBookCount}
                    />
                    <ReturnButton
                      item={item}
                      updateBookCount={updateBookCount}
                    />
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
                    <DialogTitle style={{ fontWeight: "bold", font: "Arial" }}>
                      BOOK DETAILS
                    </DialogTitle>
                    <DialogContent
                      style={{
                        maxHeight: "400px",
                        overflowY: "scroll",
                      }}
                    >
                      <div
                        style={{
                          marginBottom: "10px",
                          borderBottom: "1px solid #ddd",
                          paddingBottom: "5px",
                        }}
                      >
                        <strong>Book Name:</strong> {item.book_name}
                      </div>
                      <div
                        style={{
                          marginBottom: "10px",
                          borderBottom: "1px solid #ddd",
                          paddingBottom: "5px",
                        }}
                      >
                        <strong>Book Description:</strong>{" "}
                        {item.book_description}
                      </div>
                      <div
                        style={{
                          marginBottom: "10px",
                          borderBottom: "1px solid #ddd",
                          paddingBottom: "5px",
                        }}
                      >
                        <strong>Author Name:</strong> {item.author_name}
                      </div>
                      <div
                        style={{
                          marginBottom: "10px",
                          borderBottom: "1px solid #ddd",
                          paddingBottom: "5px",
                        }}
                      >
                        <strong>Publication Year:</strong>{" "}
                        {item.publication_year}
                      </div>
                      <div
                        style={{
                          marginBottom: "10px",
                          borderBottom: "1px solid #ddd",
                          paddingBottom: "5px",
                        }}
                      >
                        <strong>Categories:</strong>
                        <ul
                          style={{
                            paddingLeft: "20px",
                            listStyleType: "disc",
                            marginBottom: 0,
                          }}
                        >
                          {bookCategories[item.book_id]?.map((category) => (
                            <li key={category.id}>
                              {category.category_name.charAt(0).toUpperCase() +
                                category.category_name.slice(1).toLowerCase()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </DialogContent>

                    <DialogActions>
                      <Button
                        onClick={() => handleClose(index)}
                        style={{ backgroundColor: "#6c88c8" }}
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
          style={{ textAlign: "left" }}
        >
          {snackbarMessage.split("||").map((message, index) => (
            <span key={index}>
              {index > 0 && <br />}
              {message}
            </span>
          ))}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TableComponent;
