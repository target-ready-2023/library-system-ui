import React, { useState } from "react";
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

const TableComponent = ({ data, deleteBook }) => {
  const [openDialogs, setOpenDialogs] = useState([]);

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
    serialNumber: index + 1,
  }));

  const tableContainerStyles = {
    maxWidth: "900px",
    margin: "0 auto",
    borderRadius: "8px",
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
    textAlign: "center",
    fontSize: "16px",
  };

  const actionButtonsStyles = {
    display: "flex",
    justifyContent: "center",
    gap: "0.5px", // Reduce the gap between icons here
  };

  const handleDelete = (bookId) => {
    // Implement your delete logic here
    deleteBook(bookId);
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
            <TableCell style={tableHeaderCellStyles} align="center">
              Copies
            </TableCell>
            <TableCell style={tableHeaderCellStyles} align="center">
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
              <TableCell align="center"></TableCell>
              <TableCell align="center" style={tdStyles}>
                <div style={actionButtonsStyles}>
                  <IconButton onClick={() => handleOpen(index)} color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <UpdateButton item={item} />
                  <DeleteButton item={item} />
                </div>
                <Dialog
                  open={openDialogs[index]}
                  onClose={() => handleClose(index)}
                >
                  <DialogTitle>{item.book_name}</DialogTitle>
                  <DialogContent>{item.book_description}</DialogContent>
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
