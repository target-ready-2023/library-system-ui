import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import "./home.css";
import { Card } from "@mui/material";
import { useLocation } from "react-router-dom";
import TableComponent from "../TableComponent";
import SnackbarComponent from "../SnackbarComponent";
import UserContext from '../UserContext';


const Home = () => {
  const [data, setData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const location = useLocation();
  const prop1 = location.state?.prop1 || false;
  const prop2 = location.state?.prop2 || "";
  const [currentPage, setCurrentPage] = useState(0);
  const [categoryPage,setCategoryPage] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [categoryBooks,setCategoryBooks] = useState(0);
  const recordsPerPage = 5;
  const no_of_Pages=Math.ceil(totalBooks/recordsPerPage);
  const pages=Math.ceil(categoryBooks/recordsPerPage);
  const { userId,setUserId } = useContext(UserContext);
  

  
  const fetchData = async () => {
    console.log("Home"+userId);
    
    try {
      if (prop1) {

        const response = await axios.get(
          `http://localhost:8081/library_system/v1/book/category/${prop2}?page_number=${categoryPage}`
        );
        setData(response.data);
   
        const responseCategory = await axios.get(
          `http://localhost:8081/library_system/v1/books/category/total_count/${prop2}`
        );
        setCategoryBooks(responseCategory.data);

      } else {
        const response = await axios.get(
          `http://localhost:8081/library_system/v1/books_directory?page_number=${currentPage}`
        );
        setData(response.data);       
      }
      const response = await axios.get(
        "http://localhost:8081/library_system/v1/books_directory/total_count"
      );
      setTotalBooks(response.data);
    } catch (error) {
      console.error(error);
    }
    
  };
  const changePage = (page_number) => {
  
    if(prop1){
      setCategoryPage(page_number);
    } 
    else{
      setCurrentPage(page_number);
    }    
  };

  useEffect(() => {
    fetchData();
  },[location]);

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
          <TableComponent data={data} currentPage={currentPage} updateData={()=>{fetchData()}}/>

          <div>
          <ul className="pagination" id="pagination">
                <li className="page-item">
                  <a
                    href="#"
                    className="page-link"
                    onClick={(event) => {
                      event.preventDefault();
                      if(prop1 && categoryPage>0){
                        changePage(categoryPage - 1);
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
                    onClick={(event) => {
                      event.preventDefault();
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
                    onClick={(event) => {
                      event.preventDefault();
                      if(prop1 && categoryPage< pages-1){
                        console.log(categoryPage+ " "+pages-1);
                        changePage(categoryPage + 1);
                      } 
                      else if(!prop1 && currentPage< no_of_Pages-1){
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