import React, { useState, useEffect } from "react";
import {
  Button,
  Snackbar,
  Alert,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { ClickAwayListener } from "@mui/material";

const UpdateButton = ({ item, showSnackbar }) => {
  
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [categoryNames, setCategoryNames] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate=useNavigate();
  const [book, setBook] = useState({
    bookName: "",
    bookDescription: "",
    publicationYear: 2023,
    authorName: "",
  });

  const handleOpenUpdateForm = () => {
    setSelectedBook(item);
    setBook({
      bookName: item.book_name,
      bookDescription: item.book_description,
      publicationYear: item.publication_year,
      authorName: item.author_name,
    });
    fetchCategories(item.book_id);
    setIsUpdateFormOpen(!isUpdateFormOpen);
  };

  const handleCloseUpdateForm = () => {
    setIsUpdateFormOpen(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  const fetchCategories = async (bookId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/library_system/v2/categories/${bookId}`
      );
      const categoryNamesArray = response.data.map(
        (category) => category.category_name
      );
      setCategoryNames(categoryNamesArray);
    } catch (error) {
      console.error("Error fetching categories:", error);
      showSnackbar("Error fetching book categories from server", "error");
      setCategoryNames([]);
    }
  };

  useEffect(() => {
    if (selectedBook) {
      fetchCategories(selectedBook.book_id);
    }
  }, [selectedBook]);

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
    const lowercaseCategory = newCategory.trim().toLowerCase();
    setCategoryNames((prevCategories) => [
      ...prevCategories,
      lowercaseCategory,
    ]);
    setNewCategory("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    const data = {
      book: {
        ...book,
        publicationYear: parseInt(book.publicationYear),
        book_id: selectedBook.book_id,
      },
      categoryNames,
    };

    const updateApiUrl = `http://localhost:8081/library_system/v1/inventory/book/update`;

    axios
      .put(updateApiUrl, data)
      .then((response) => {
        console.log("Book updated successfully.");
        
        showSnackbar(
          `Book with Sl. No. ${item.serialNumber} updated successfully!`,
          "success",20000
        );
        
        handleCloseUpdateForm();
        // window.location.reload();
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error updating the book:", error.message);
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
        }
      })
      .finally(() => {
        setIsUpdating(false);
      });
      
  };

  return (
    <div>
      {isUpdating && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            Updating...
          </Typography>
          <CircularProgress
            color="primary"
            style={{
              position: "absolute",
              top: 230,
              left: "48%",
            }}
          />
        </div>
      )}

      <Button className="update-button" onClick={handleOpenUpdateForm}>
        <Edit style={{ fontSize: 25, padding: 1 }} />
      </Button>
      <Dialog
        open={isUpdateFormOpen}
        onClose={() => setIsUpdateFormOpen(false)}
        maxWidth="md"
        scroll="paper"
        fullWidth
        classes={{ paper: "dialogContainer" }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontFamily: "Arial" }}>
          UPDATE BOOK DETAILS
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
            onClick={handleCloseUpdateForm}
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateButton;
