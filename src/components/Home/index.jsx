import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import { Card } from "@mui/material";
import { useLocation } from "react-router-dom";
import TableComponent from "../TableComponent";
import SnackbarComponent from "../SnackbarComponent";

const Home = () => {
  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const location = useLocation();
  const prop1 = location.state?.prop1 || "";
  const prop2 = location.state?.prop2 || "";
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 5;
  const lastIndex = (currentPage + 1) * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(data.length / recordsPerPage);
  const [count, setCount] = useState(0);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleToggleDrawer = (item) => {
    setSelectedBook(item);
    setDrawerOpen(!drawerOpen);
  };
  const generatePaginationNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= nPage; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const Numbers = generatePaginationNumbers();

  const fetchData = async () => {
    try {
      if (prop1) {
        const response = await axios.get(
          `http://localhost:8081/library_system/v1/book/category/${prop2}`
        );
        setData(response.data);
        console.log(response.data);
        prop1 = "false";
      } else {
        const response = await axios.get(
          `http://localhost:8081/library_system/v1/books_directory?pageNumber=${currentPage}`
        );
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const changePage = (page_number) => {
    setCurrentPage(page_number);
  };

  useEffect(() => {
    fetchData();
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div sx={{ paddingTop: "70px", fontFamily: "TimesNewRoman" }}>
      <Card className="App-Card">
        <h3>Books Directory</h3>
        <div>
          <TableComponent data={data} />
          {/* <ul className="pagination">
            <li className="page-item">
              <a
                href="#"
                className="page-link"
                onClick={() => {
                  if (currentPage > 0) changePage(currentPage - 1);
                }}
              >
                Previous
              </a>
            </li>
            {Numbers.map((number, index) => (
              <li
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
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
                  if (currentPage < nPage) changePage(currentPage + 1);
                }}
              >
                Next
              </a>
            </li>
          </ul> */}

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
              if (currentPage < nPage) changePage(currentPage + 1);
            }}
          >
            Next
          </a>
        </li>
      </ul>

          <SnackbarComponent
            openSnackbar={openSnackbar}
            handleCloseSnackbar={handleCloseSnackbar}
            snackbarMessage={snackbarMessage}
          />
        </div>
      </Card>
    </div>
  );
};
export default Home;