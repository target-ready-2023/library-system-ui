import React, { useState } from "react";
import {
  Button,
  Icon,
  TextField,
  Box,
  FormLabel,
  Snackbar,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import axios from "axios";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(1),
  textAlign: "center",
  color: "black",
}));

function AddButton({ showSnackbar }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [categoryNames, setCategoryNames] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [numberOfCopies, setNumberOfCopies] = useState(0);
  const userId=localStorage.getItem("userId");
  const [book, setBook] = useState({
    bookName: "",
    bookDescription: "",
    publicationYear: 0,
    authorName: "",
  });

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const resetForm = () => {
    setBook({
      bookName: "",
      bookDescription: "",
      publicationYear: 0,
      authorName: "",
    });
    setCategoryNames([]);
    setNewCategory("");
    setNumberOfCopies(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      book: {
        ...book,
        publicationYear: parseInt(book.publicationYear),
      },
      category_names: categoryNames,
      no_of_copies: parseInt(numberOfCopies),
    };

    axios
      .post("http://localhost:8081/library_system/v1/inventory/books", data)
      .then((response) => {
        console.log("Response from the server:", response.data);
        setDialogOpen(false);
        resetForm();
        showSnackbar("Book added successfully!", "success");
      })
      .catch((error) => {
        console.error("Error posting data:", error);
        if (error.response && error.response.status === 409) {
          const errorData = error.response.data;
          const errorMessage = errorData.message;
          showSnackbar(errorMessage, "error");
        } else if (error.response && error.response.status === 400) {
          console.log("Error response data:", error.response.data);
          const errorMessage = error.response.data;
          const delimiter = "||";
          const formattedErrorMessages = errorMessage.join(delimiter);
          showSnackbar(formattedErrorMessages, "error");
        } else {
          showSnackbar("Error submitting form", "error");
          resetForm();
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleNumberOfCopiesChange = (e) => {
    setNumberOfCopies(e.target.value);
    console.log("num " + numberOfCopies);
  };
  const addCategory = () => {
    if (newCategory.trim()) {
      const lowerCaseCategory = newCategory.toLowerCase(); // Convert to lowercase
      if (!categoryNames.includes(lowerCaseCategory)) {
        setCategoryNames((prevCategories) => [
          ...prevCategories,
          lowerCaseCategory,
        ]);
        setNewCategory("");
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <>
      <Item>
        <Icon>
          <LocalLibraryIcon />
        </Icon>
        <Button
          sx={{
            color: "black",
            fontSize: "12px",
            height: "30px",
            width: "70%",
            fontFamily: "Arial",
          }}
          onClick={toggleDialog}
          disabled={!userId}
        >
          Add Book
        </Button>
      </Item>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        classes={{ paper: "dialogContainer" }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontFamily: "Arial" }}>
          NEW BOOK DETAILS
        </DialogTitle>
        <DialogContent>
          <TextField
            name="bookName"
            label="Book Name"
            value={book.bookName}
            onChange={handleChange}
            fullWidth
            required
            style={{ marginBottom: "10px", marginTop: "5px" }}
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
            name="authorName"
            label="Author Name"
            value={book.authorName}
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
            name="numberOfCopies"
            label="Number Of copies of the book "
            value={numberOfCopies}
            onChange={handleNumberOfCopiesChange}
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
                  style={{
                    marginLeft: "10px",
                    backgroundColor: newCategory.trim() ? "#6c88c8" : "#e0e0e0",
                    color: newCategory.trim() ? "white" : "black",
                  }}
                >
                  Add
                </Button>
              ),
            }}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpen(false);
              resetForm();
            }}
            style={{ backgroundColor: "#6c88c8" }}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "33px", backgroundColor: "#6c88c8" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddButton;
