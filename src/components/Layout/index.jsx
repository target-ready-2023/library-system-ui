import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import "./Layout.css";
import {
  Button,
  Icon,
  Drawer,
  TextField,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import { FormLabel } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "white",
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "black",
}));

export default function RowAndColumnSpacing() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [chipData, setChipData] = useState([]);
  // const toggleDrawer = () => {
  //   setDrawerOpen(!drawerOpen);
  // };
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    if (!drawerOpen) {
      resetForm();
    }
  };

  const handleHome = () => {
    navigate("/home");
  };
  const handleCategory = () => {
    navigate("/category");
  };

  const [book, setBook] = useState({
    bookName: "",
    bookDescription: "",
    publicationYear: 0,
    authorName: ""
  });

  const [categoryNames, setCategoryNames] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [numberOfCopies, setNumberOfCopies] = useState(1);
  

  const resetForm = () => {
    setBook({
      bookName: "",
      bookDescription: "",
      publicationYear: 0,
      authorName: "",
    });
    setCategoryNames([]);
    setNewCategory("");
    setNumberOfCopies("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      book: {
        ...book,
        publicationYear: parseInt(book.publicationYear),
      },      
      category_names: categoryNames,
      no_of_copies: parseInt(numberOfCopies)
    };

    axios
      .post("http://localhost:8081/library_system/v1/inventory/books", data)
      .then((response) => {
        console.log("Response from the server:", response.data);
        console.log(data);
        setSnackbarMessage("Book Added Successfully");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setDrawerOpen(false);
        resetForm();  
        handleHome();

      })

      .catch((error) => {
        console.error("Error posting data:", error);
        console.log("Form data:", data);
        if (error.response && error.response.status === 409) {
          const errorData = error.response.data;
          const errorMessage = errorData.message; // Assuming the error message is the response body
          setSnackbarMessage(errorMessage);
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
          //resetForm();
          
        } else if (error.response && error.response.status === 400) {
          console.log("Error response data:", error.response.data);
          const errorMessage = error.response.data;
          const delimiter = "||";
          const formattedErrorMessages = errorMessage.join(delimiter);
          setSnackbarMessage(formattedErrorMessages);
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
          //set
        } else {
          setSnackbarMessage("Error submitting form.");
          resetForm();
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
          //setDrawerOpen(false);
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
    console.log("num "+numberOfCopies);
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      const lowerCaseCategory = newCategory.toLowerCase(); // Convert to lowercase
      if (!categoryNames.includes(lowerCaseCategory)) {
        setCategoryNames((prevCategories) => [...prevCategories, lowerCaseCategory]);
        setNewCategory('');
      }
    }
  };
    
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Grid container spacing={0} sx={{ height: "90vh" }}>
      <Grid
        item
        xs={1.5}
        style={{ backgroundColor: "#6c88c8" }}
        className="sidebar"
      >
        <Grid item xs={12} p={2}>
          <div>
            <Item>
              <Icon>
                <HomeIcon />
              </Icon>
              <Button
                sx={{
                  color: "black",
                  fontSize: "12px",
                  height: "30px",
                  width: "70%",
                  fontFamily: "TimesNewRoman",
                }}
                onClick={handleHome}
              >
                Books Directory
              </Button>
            </Item>
          </div>
        </Grid>
        <Grid item xs={12} p={2}>
          <div>
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
                  fontFamily: "TimesNewRoman",
                }}
                onClick={toggleDrawer}
              >
                Add Books
              </Button>
            </Item>
            <Drawer
              anchor="bottom"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{
                style: {
                  height: "80%",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
            >
              <Box p={2} style={{ border: "black" }}>
                <FormLabel
                  sx={{
                    marginBottom: "10px",
                    fontFamily: "TimesNewRoman",
                    fontSize: "50px",
                  }}
                >
                  Book Details
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
                    name="numberOfCopies"
                    label="Number Of Copies"
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
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px" }}
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            </Drawer>
          </div>
        </Grid>
        <Grid item xs={12} p={2}>
          <Item>
            <Icon>
              <CategoryIcon />
            </Icon>
            <Button
              sx={{
                color: "black",
                fontSize: "12px",
                height: "30px",
                width: "70%",
                fontFamily: "TimesNewRoman",
              }}
              onClick={handleCategory}
            >
              Category
            </Button>
          </Item>
        </Grid>
      </Grid>
      <div className="display"></div>

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
          {snackbarMessage.split("||").map((message, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {message}
          </span>
        ))}
        </Alert>
      </Snackbar>
    </Grid>
  );
}