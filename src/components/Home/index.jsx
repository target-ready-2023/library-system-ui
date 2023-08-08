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
  const [pageChange,setPageChange] =useState(false);
  const location = useLocation();
  const prop1 = location.state?.prop1 || false;
  const prop2 = location.state?.prop2 || "";
  const [currentPage, setCurrentPage] = useState(0);
  const [categoryPage,setCategoryPage] = useState(0);
  const recordsPerPage = 5;
  const lastIndex = (currentPage + 1) * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  console.log("prop1 "+prop1);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleToggleDrawer = (item) => {
    setSelectedBook(item);
    setDrawerOpen(!drawerOpen);
  };
  const generatePaginationNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 1000; i++) {
      numbers.push(i);
    }
    return numbers;
  };
 
  const Numbers = generatePaginationNumbers();

  const fetchData = async () => {
    
    try {
      if (prop1) {
        console.log("Hit category page with prop1 "+ prop1);
        const response = await axios.get(
          `http://localhost:8081/library_system/v1/book/category/${prop2}?page_number=${categoryPage}`
        );
      
        setData(response.data);
       console.log("data "+ response.data);

      } else {
        console.log("Hit books directory with page "+currentPage);
        const response = await axios.get(
          `http://localhost:8081/library_system/v1/books_directory?page_number=${currentPage}`
        );
        if(response.data.length>0 || currentPage===0)
          setData(response.data);
        else
          setCurrentPage(currentPage-1);
        
      }
    } catch (error) {
      console.error(error);
    }
    
  };
  const changePage = (page_number) => {
    if(prop1){
      setCategoryPage(page_number);
      console.log("changed category page "+categoryPage);
    } 
    else{
      setCurrentPage(page_number);
      console.log("changed current page "+currentPage);
    }    
    console.log("first prop1 "+prop1+" prop2 "+prop2 );
  };

  useEffect(() => {
    fetchData();
  },[prop1,currentPage,categoryPage]);

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
          <TableComponent data={data} currentPage={currentPage}/>

          <div>
          <ul className="pagination" id="pagination">
                <li className="page-item">
                  <a
                    href="#"
                    className="page-link"
                    onClick={() => {
                      if(prop1 && categoryPage>0){
                        console.log("changing category page");
                        
                        changePage(categoryPage-1);
                      } 
                      else if (currentPage > 0){
                   
                        changePage(currentPage - 1);
                      } 
                    }}
                  >
                    Previous
                  </a>
                </li>
                <li  className={`page-item `} >
                   <a
                    href="#"
                    className="page-link"
                    onClick={() => {
                      if(prop1){
                        
                        changePage(categoryPage);
                      } 
                      else {
                        
                        changePage(currentPage);
                      }
                    } }
                    >
                    {prop1 ? categoryPage + 1 : currentPage + 1}
                      
                  </a>
                </li>
                <li className="page-item">
                  <a
                    href="#"
                    className="page-link"
                    onClick={() => {
                      if(prop1){
                        console.log("changing category page");
                       
                        changePage(categoryPage+1);
                      } 
                      else{
                        
                         changePage(currentPage + 1);
                      }
                    }}
                  >
                    Next
                  </a>
                </li>
              </ul>
          </div>


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