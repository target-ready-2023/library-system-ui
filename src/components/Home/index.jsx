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
        <div sx={{paddingTop:'70px', fontFamily:'TimesNewRoman'}}>
        <Card className="App-Card">
            <h3>Books Directory</h3>
            <div>
                {data.map((item) => (
                    <div >
                      
                    <p key={item.book_id}>
                     <Button onClick={() => handleToggleDrawer(item)}  
                     sx={{ width: '100%',
                     height: '70px',
                     marginTop:'10px',
                     textAlign: 'left',
                     fontFamily:'TimesNewRoman',
                     fontSize:'20px',
                     padding:'10px',
                     color:'black'}}>
                     <Box sx={{
                        backgroundColor: 'lightBlue',
                        width: '84%',
                        height: '70px',
                        marginLeft:'210px',
                        marginTop:'5px',
                        textAlign: 'left',
                        fontFamily:'TimesNewRoman',
                        fontSize:'20px',
                        padding:'10px',
                        borderRadius: '5px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s', 
                        '&:hover': {
                          transform: 'scale(1.01)', 
                        },
           
        }}>
                        {item.book_name}
                        </Box>
                     </Button>
                    
                     </p>
                      
                    </div> 
                    ))}
                    <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    PaperProps={{ style: { height: '100%', width:'70%', alignItems: 'center', justifyContent: 'center'} }}
                  >
                    {selectedBook && (
                    <div className="details">
                          <Button style={{Color:red,marginLeft:'85%'}} onClick={() => deleteBook(selectedBook.book_id)}>Delete Book</Button>
                         <h2>{selectedBook.book_name.toUpperCase()}</h2>
                        <Box sx={{fontSize:"25px",fontFamily:'TimesNewRoman'}}>
                        <p>{selectedBook.book_description}</p>
                        <p>{selectedBook.category_name}</p>
                        <p>{selectedBook.author_name}</p>
                        <p>{selectedBook.publication_year}</p>
                        </Box>
                    </div>
                    )}
                  
                  </Drawer>
                                
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