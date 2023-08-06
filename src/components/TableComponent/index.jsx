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
import IssueButton  from "../IssueButton";
import ReturnButton from "../ReturnButton";

const TableComponent = ({ data, currentPage }) => {
  const [openDialogs, setOpenDialogs] = useState(
    Array(data.length).fill(false)
  );
  const [numberOfCopies, setNumberOfCopies] = useState([]);
  const [fetchDataFlag, setFetchDataFlag] = useState(true);

  const [copiesData, setcopiesData] = useState([]);

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

  const dataWithSerialNumber = data.map((item, index) => ({
    ...item,
    serialNumber: currentPage*5 + (index+1),
  }));

  const fetchNumberOfCopies = async () => {
    const copiesData = {};
    for (const item of data) {
      try {
        const response = await axios.get(
          `http://localhost:8081/library_system/v1/book/no_of_copies/${item.book_id}`
        );
        copiesData[item.book_id] = response.data;
      } catch (error) {
        copiesData[item.book_id] = "N/A";
      }
    }
    setNumberOfCopies(copiesData);
  };

  useEffect(() => {
    if (fetchDataFlag && data.length>0) {
      fetchNumberOfCopies();
      setFetchDataFlag(false);
    }
  }, [data, fetchDataFlag]);

  useEffect(() => {
    setFetchDataFlag(true);
  },[data]);

  const updateBookCount = async (bookId) =>{
    try {
      const response = await axios.get(
        `http://localhost:8081/library_system/v1/book/no_of_copies/${bookId}`
      );
      numberOfCopies[bookId] = response.data;
    } catch (error) {
      numberOfCopies[bookId] = "N/A";
    }
    setNumberOfCopies(JSON.parse(JSON.stringify(numberOfCopies)));
  } 

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
          {dataWithSerialNumber.map((item, index) => (
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
                  <IconButton onClick={() => handleOpen(index)} color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <UpdateButton item={item} />
                  <DeleteButton item={item} />
                  <IssueButton item={item} updateBookCount = {updateBookCount} />
                  {/* <IconButton color="primary" title = {"Issue Book"} onClick={() => handleIssue(item)}>
                    <LibraryAddIcon />
                  </IconButton> */}
                  {/* <IconButton color="primary" title = {"Return Book"}>
                    <RemoveCircleOutlineIcon />
                  </IconButton> */}
                  <ReturnButton item={item} updateBookCount = {updateBookCount} />
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
                  <DialogTitle>Book name: {item.book_name}</DialogTitle>
                  <DialogContent>
                    Book Description: {item.book_description}
                  </DialogContent>
                  <DialogContent>Author name: {item.author_name}</DialogContent>
                  <DialogContent>
                    Publication year: {item.publication_year}
                  </DialogContent>

                  <DialogActions>
                    <Button onClick={() => handleClose(index)} color="primary">
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
  );
};

export default TableComponent;
