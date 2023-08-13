import { Card, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import {
  Button,
  Icon,
  Drawer,
  TextField,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { FormLabel } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate ,Link} from "react-router-dom";

import { makeStyles } from "@mui/styles";
import Home from "../Home";

const useStyles = makeStyles((theme) => ({
  customButton: {
    height: "auto",
    // Add more custom styles here as needed
  },
}));

const Category = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 10;
  const lastIndex = (currentPage + 1) * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(data.length / recordsPerPage);
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [formData, setFormData] = useState({
    categoryName: "",
  });

  const generatePaginationNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= nPage; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const Numbers = generatePaginationNumbers();

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
 };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleButtonClick = (categoryName) => {
     navigate("/home", { state: { prop1: true, prop2: categoryName } });
  };

  const handleSubmit = () => {
    setDrawerOpen(false);
    setOpen(true);
  };

  const postData = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/library_system/v2/inventory/category",
        formData
      );
      setResponseMessage(response.data.message);
      console.log(response.data.message);
      setDrawerOpen(false);
      setOpen(true);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  const dataWithSerialNumber = data?.map((item, index) => ({
    ...item,
    serialNumber: currentPage*10 + (index+1),
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/library_system/v2/categories?page_number=${currentPage}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  },[currentPage]);

  return (
    
     <div className={classes.customButton} sx={{ paddingTop: "70px", fontFamily: "TimesNewRoman",top:"30%" }}>
      <Card className="App-Card">
      <div style={{ marginTop: "5%", height: "auto" }}>
        <TableContainer component={Paper} style={tableContainerStyles}>
        <Table style={tableStyles}>
          <TableHead>
            <TableRow>
              <TableCell style={tableHeaderCellStyles} align="center">
                No.
              </TableCell>
              <TableCell style={tableHeaderCellStyles} align="center">
                category Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataWithSerialNumber.map((item, index) => (
              <TableRow key={item.category_id}>
                <TableCell align="center">{item.serialNumber}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleButtonClick(item.category_name)} color="primary">
                    {item.category_name}
                  </Button>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        
      </div>
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
        {Numbers.map((number, index) => (
          <li
            className={`page-item ${currentPage === number ? "active" : ""}`}
            key={index}
          >
            <a
              href="#"
              className="page-link"
              onClick={() => changePage(number)}
            >
              {currentPage + 1}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            href="#"
            className="page-link"
            onClick={() => {
              if (currentPage < nPage-1) changePage(currentPage + 1);
            }}
          >
            Next
          </a>
        </li>
      </ul>

      </Card>
      
    </div>
  );
};
export default Category;
