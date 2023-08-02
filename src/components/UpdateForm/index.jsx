import React, { useState, useEffect } from "react";
import { TextField, Button, FormLabel } from "@mui/material";
import { Box } from "@mui/material";
import axios from "axios";

// const UpdateForm = ({ selectedBook, handleCloseDrawer }) => {
//   const resetForm = () => {
//     setBook({
//       bookName: "",
//       bookDescription: "",
//       publicationYear: 0,
//       authorName: "",
//     });
//     setCategoryNames([]);
//     setNewCategory("");
//   };
//   //   const [book, setBook] = useState(
//   //     selectedBook || {
//   //       bookName: "",
//   //       bookDescription: "",
//   //       publicationYear: 0,
//   //       authorName: "",
//   //     }
//   //   );
//   const [book, setBook] = useState({
//     bookName: selectedBook?.bookName || "",
//     bookDescription: selectedBook?.bookDescription || "",
//     publicationYear: selectedBook?.publicationYear || "",
//     authorName: selectedBook?.authorName || "",
//   });

//   useEffect(() => {
//     setBook(
//       selectedBook || {
//         bookName: "",
//         bookDescription: "",
//         publicationYear: 0,
//         authorName: "",
//       }
//     );
//   }, [selectedBook]);

//   const [categoryNames, setCategoryNames] = useState([]);
//   const [newCategory, setNewCategory] = useState("");
const UpdateForm = ({ selectedBook, handleCloseDrawer }) => {
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
    setCategoryNames((prevCategories) => [
      ...prevCategories,
      newCategory.trim(),
    ]);
    setNewCategory("");
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
        handleCloseDrawer(); // Close the drawer after successful update
      })
      .catch((error) => {
        console.error("Error updating the book:", error.message);
      });
    resetForm();
  };

  return (
    <div>
      <FormLabel
        sx={{
          marginBottom: "10px",
          fontFamily: "Times New Roman",
          fontSize: "50px",
        }}
      >
        Update Book Details
      </FormLabel>

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
        <div>
          {categoryNames.map((category, index) => (
            <div key={index}>{category}</div>
          ))}
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateForm;
