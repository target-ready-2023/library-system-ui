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

const Home = () => {
  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
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
        const response = await axios.get(`http://localhost:8081/library_system/v1/books_directory?pageNumber=${currentPage}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  });
  
  const changePage = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber <= nPage+1) {
      setCurrentPage(pageNumber);
    }
  };
    // var items = [
        
    //     {
    //         image:`${image1}`, 
    //         name: 'Learn and Grow ',
    //         disc: 'Together!'
           
    //     },
    //     {  
    //         image:`${image2}`, 
    //         name: 'In your own ',
    //         disc: 'Space!'
            
            
    //     },
    //     { 
    //         image:`${image3}`, 
    //         name: 'At your own ',
    //         disc: 'Pace!'
           
            
    //     }

    // ]
    

    return (
        <div sx={{paddingTop:'70px', fontFamily:'TimesNewRoman'}}>
        <Card className="App-Card">
            <h3>Books Directory</h3>
            <div>
                {data.map((item) => (
                    <div>
                      
                    <p key={item.bookId} >
                     <Button onClick={() => handleToggleDrawer(item)}  
                     sx={{ width: '100%',
                     height: '70px',
                    // marginLeft:'10px',
                     marginTop:'10px',
                     textAlign: 'left',
                     fontFamily:'TimesNewRoman',
                     fontSize:'20px',
                     padding:'10px',
                     color:'black'}}>
                     <Box sx={{
                        backgroundColor: 'lightBlue',
                      //border: '2px solid black',
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
                        transition: 'transform 0.3s', // Add transition for smooth zoom effect
                        '&:hover': {
                          transform: 'scale(1.01)', // Zoom the box by 10% on hover
                        },
           //position: 'fixed',
        //   top: '500px',
        //   left: '500px',
        }}>
                        {item.bookName}
                        </Box>
                     </Button>
                    
                     {/* sx={{
                        top:'5px',
                        left:'90%',
                        display: 'flex',
                        fontFamily:'TimesNewRoman',
                        color:"black"}}
                    
                    <></>
                     */}</p>
                      
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
                
                        {/* <h1>{name.toUpperCase()}</h1> */}
                        <h2>{selectedBook.bookName.toUpperCase()}</h2>
                        <Box sx={{fontSize:"25px",fontFamily:'TimesNewRoman'}}>
                        <p>{selectedBook.bookDescription}</p>
                        <p>{selectedBook.categoryName}</p>
                        <p>{selectedBook.authorName}</p>
                        <p>{selectedBook.publicationYear}</p>
                        </Box>
                    </div>
                    )}
                  
                  </Drawer>
                                
            </div>

            <ul className="pagination">
              <li className="page-item">
                <a href="#" className="page-link" onClick={() => changePage(currentPage - 1)}>
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
                <a href="#" className="page-link" onClick={() => changePage(currentPage + 1)}>
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