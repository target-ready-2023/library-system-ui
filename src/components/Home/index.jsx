import { Button, Card,Drawer,Box } from "@mui/material"
import Carousel from 'react-material-ui-carousel'
import React from 'react';
import { Grid } from '@mui/material'
import image1 from "../../images/image3.png"
import image2 from "../../images/image2.png"
import image3 from "../../images/image1.png"
import './home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
//import { Numbers } from "@mui/icons-material";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { red } from "@mui/material/colors";
import { Delete, Edit } from '@mui/icons-material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';


const Home = () => {
  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const location = useLocation();
  const prop1 = location.state?.prop1 || '';
  const prop2 = location.state?.prop2 || '';
//    const name=selectedBook.bookName

const [currentPage,setCurrentPage]=useState(0);
  const recordsPerPage=5;
  const lastIndex=(currentPage+1)*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const records=data.slice(firstIndex,lastIndex);
  const nPage=Math.ceil(data.length/recordsPerPage);

  const columnStyles = {
    backgroundColor: 'lightBlue',
    width: '90%', 
    height: '70px',
    margin: '5px', 
    left:'10px',
    textAlign: 'left',
    fontFamily: 'TimesNewRoman',
    fontSize: '20px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  };

    const [count, setCount] = useState(0);
  
    const handleIncrement = () => {
      setCount((prevCount) => prevCount + 1);
    };
  
    const handleDecrement = () => {
      setCount((prevCount) => prevCount - 1);
    };
  
   
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
 

  useEffect(() => {
    const fetchData = async () => {
       try {
        if(prop1){
          const response = await axios.get(`http://localhost:8081/library_system/v1/book/category/${prop2}`);
          setData(response.data);
          console.log(response.data);
          prop1="false";
        }
     else{
        
        const response = await axios.get(`http://localhost:8081/library_system/v1/books_directory?pageNumber=${currentPage}`);
        setData(response.data);
      }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  },[prop1, currentPage]);
  
  const changePage = (page_number) => {
      setCurrentPage(page_number);
  };

 
  const deleteBook = (book_id) =>{
    const deleteApiUrl = `http://localhost:8081/library_system/v1/book/${book_id}`;

      fetch(deleteApiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Book deleted successfully.');
        setData((prevData) => prevData.filter((book) => book.book_id !== book_id));
        setDrawerOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting the book:', error.message);
      });

  } 


    return (
        <div sx={{paddingTop:'70px', fontFamily:'TimesNewRoman',}}>
        <Card className="App-Card">
            <h3>Books Directory</h3>
            <div>
              <table style={{ width: '80%', borderCollapse: 'collapse',marginLeft:'200px' }}>
                <thead>
                  <tr>
                    <th>Book Name</th>
                    <th>Book Description</th>
                    {/* <th>Category Name</th> */}
                    <th>Author Name</th>
                    <th>Publication Year</th>
                    <th>Issue Book</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                  <tbody>
                  {data.map((item) => (
                    <tr key={item.book_id}>
                      <td>
                        <Box sx={columnStyles}>
                          {item.book_name}
                        </Box>
                      </td>
                      <td >
                        <Box sx={columnStyles}>
                          {item.book_description}
                        </Box>
                      </td>
                      <td>
                        <Box sx={columnStyles}>
                          {item.author_name}
                        </Box>
                      </td>
                      <td >
                        <Box sx={columnStyles}>
                          {item.publication_year}
                        </Box>
                      </td>
                      <td >
                        <Box sx={columnStyles}>
                        
                          <button onClick={handleDecrement}>
                            <RemoveCircleOutline />
                          </button>
                          <span>{count}</span>
                          <button onClick={handleIncrement}>
                            <AddCircleOutline />
                          </button>
                          
                        
                        </Box>
                      </td>
                      <td >
                      <button className="update-button" >
                          <i className="fas fa-trash"></i> 
                          <Edit />
                          Update
                        </button>
                      </td>
                      <td >
                        <button className="delete-button" onClick={() => deleteBook(item.book_id)}>
                          <i className="fas fa-trash"></i> 
                          <Delete />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
            <ul className="pagination">
              <li className="page-item">
                <a href="#" className="page-link" onClick={() => { if (currentPage > 0) changePage(currentPage - 1) }}>
                    previous
                </a>
              </li>
              {Numbers.map((number, index) => (
                <li
                  className={`page-item ${currentPage === number ? 'active' : ''}`}
                  key={index}
                >
                  <a href="#" className="page-link" onClick={() => changePage(number)}>
                    {currentPage+1}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a href="#" className="page-link" onClick={() => { if(currentPage < nPage) changePage(currentPage + 1)}}>
                  Next
                </a>
              </li>
            </ul>
            
        </Card>

      
        
        {/* <Carousel animation='slide' duration={500}>
            {
                items.map( (item,i)=> <Item key={i} item={item} /> ) 
                
                
                
            }
        </Carousel> */}

        </div>
    )
}


// function Item(props) {
//     return (
//         <Grid container>
//             <Grid item xs={12}>
//                 <div className='slide'>
//                     <div className='slider-image'>
//                         <img src={props.item.image}
//                             alt='carousel'/>
//                     </div>
//                     <div className='meta' >
//                         <h2>{props.item.name}</h2>
//                         <h1>{props.item.disc}</h1>
//                     </div>
//                 </div>
//             </Grid>
//         </Grid>
//     )
// }
export default Home;