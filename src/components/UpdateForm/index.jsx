import React, { useState, useEffect } from "react";
import {
  Snackbar,
  Alert,
  Chip,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import "./UpdateForm.css";

const UpdateForm = ({ selectedBook, handleCloseForm }) => {
  // setOpen(true);
  const resetForm = () => {
    setBook({
      bookName: "",
      bookDescription: "",
      publicationYear: 0,
      authorName: "",
    });
    setCategoryNames([]);
    setNewCategory("");
  };

  const [book, setBook] = useState({
    bookName: "",
    bookDescription: "",
    publicationYear: 0,
    authorName: "",
  });

  useEffect(() => {
    if (selectedBook) {
      setBook({
        bookName: selectedBook.bookName || "",
        bookDescription: selectedBook.bookDescription || "",
        publicationYear: selectedBook.publicationYear || "",
        authorName: selectedBook.authorName || "",
      });
    }
  }, [selectedBook]);

  const [categoryNames, setCategoryNames] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [open, setOpen] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleClose = () => {
    setOpen(false);
    resetForm();
    handleCloseForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const addCategory = () => {
    const lowercaseCategory = newCategory.trim().toLowerCase(); // Convert to lowercase
    setCategoryNames((prevCategories) => [
      ...prevCategories,
      lowercaseCategory,
    ]);
    setNewCategory("");
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      book: {
        ...book,
        publicationYear: parseInt(book.publicationYear),
      },
      categoryNames,
    };

    const updateApiUrl = `http://localhost:8081/library_system/v1/inventory/book/update/${selectedBook.book_id}`;

    axios
      .put(updateApiUrl, data)
      .then((response) => {
        console.log("Book updated successfully.");
        setSnackbarMessage("Book updated successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating the book:", error.message);
      });
  };

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      classes={{ paper: "dialogContainer" }}
    >
      <DialogTitle>Update Book Details</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="bookName"
            label="Book Name"
            value={book.bookName}
            onChange={handleChange}
            fullWidth
            required
            style={{ marginBottom: "10px" }}
          />
          <TextField
            name="bookDescription"
            label="Book Description"
            value={book.bookDescription}
            onChange={handleChange}
            fullWidth
            required
            style={{ marginBottom: "10px" }}
          />
          <TextField
            name="publicationYear"
            label="Publication Year"
            value={book.publicationYear}
            onChange={handleChange}
            fullWidth
            required
            style={{ marginBottom: "10px" }}
          />
          <TextField
            name="authorName"
            label="Author Name"
            value={book.authorName}
            onChange={handleChange}
            fullWidth
            required
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Categories"
            value={newCategory}
            onChange={handleCategoryChange}
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addCategory}
                  disabled={!newCategory.trim()}
                >
                  Add
                </Button>
              ),
            }}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          {/* <div>
            {categoryNames.map((category, index) => (
              <div key={index}>{category}</div>
            ))}
          </div> */}
          <div>
            {categoryNames.map((category, index) => (
              <Chip
                key={index}
                label={category}
                onDelete={() =>
                  setCategoryNames((prevCategories) =>
                    prevCategories.filter((_, i) => i !== index)
                  )
                }
                style={{ margin: 4 }}
              />
            ))}
          </div>
          <div className="dialogActionsButtonGroup">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Update
            </Button>
            <Button onClick={handleClose} variant="contained" color="primary">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
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
    </Dialog>
  );
};

export default UpdateForm;
