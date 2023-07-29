import { Card } from "@mui/material"
import Box from '@mui/material/Box';
import { Button, Icon, Drawer, TextField, Snackbar, Alert} from '@mui/material';
import { FormLabel } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';


import { makeStyles } from '@mui/styles';
import Home from '../Home';

const useStyles = makeStyles((theme) => ({
  customButton: {
    
    height:'auto'
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

      const [data,setData]=useState([]);
      const [currentPage,setCurrentPage]=useState(0);
      const recordsPerPage=5;
      const lastIndex=(currentPage+1)*recordsPerPage;
      const firstIndex=lastIndex-recordsPerPage;
      const records=data.slice(firstIndex,lastIndex);
      const nPage=Math.ceil(data.length/recordsPerPage);
      const [open, setOpen] = useState(false);
      const [responseMessage, setResponseMessage] = useState('');
      const [categoryData,setcategoryData]=useState("false");

      const [formData, setFormData] = useState({
       
        categoryName: ''
        
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
        if (pageNumber >= 0 && pageNumber <= nPage+1) {
          setCurrentPage(pageNumber);
        }
      };
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
         
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
  
      const handleButtonClick = (categoryName) => {
        setcategoryData(!categoryData);
        navigate('/', { state: { prop1: categoryData, prop2: categoryName } });
       
      };
      
      const handleSubmit = () => {
       
        setDrawerOpen(false);
        setOpen(true);        
      };

      const postData = async (e) => {
        try {
          const response = await axios.post('http://localhost:8081/library_system/v2/inventory/category', formData)
          setResponseMessage(response.data.message);
          console.log(response.data.message);
          setDrawerOpen(false);
          setOpen(true);
        } catch (error) {
          console.error('Error making POST request:', error);
        }
      };

      
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8081/library_system/v2/categories`);
            setData(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      });
    return (
        <div className={classes.customButton}>
                
        <div style={{marginTop:'5%',height:'auto'}}>
        <div sx={{backgroundColor:' #6c88c8'}}><Button sx={{color:'black',backgroundColor:'rgb(108, 191, 223)' ,fontSize:'15px',marginTop:'20px',left:'85%', fontFamily:'TimesNewRoman',fontWeight:'bold'}} onClick={toggleDrawer}>Add Category</Button></div> 

                {data.map((item) => (
                    <div >
                      
                    <p key={item.category_id} >
                     { <Button onClick={() => 
                    handleButtonClick(item.category_name)
                  
                    }  
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
                        width: '75%',
                        height: '70px',
                        marginLeft:'20%',
                        marginRight:'20%',
                        marginTop:'5px',
                        textAlign: 'left',
                        fontFamily:'TimesNewRoman',
                        fontSize:'20px',
                        padding:'10px',
                        left: '500px',
                        borderRadius: '5px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s', // Add transition for smooth zoom effect
                        '&:hover': {
                          transform: 'scale(1.01)', // Zoom the box by 10% on hover
                        },
           
        }}>
                        {item.category_name}
                        </Box>
                      </Button> }
                    
                     </p>
                      
                    </div> 
                    ))}
                   
                                
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


 <div>
  <Drawer
  anchor="bottom"
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  PaperProps={{ style: { height: '50%', alignItems: 'center', justifyContent: 'center'} }}
>
  <Box p={2} style={{border:'black'}}>
    <FormLabel sx={{marginBottom:'10px', fontFamily:'TimesNewRoman', fontSize:'50px'}}>Category Details</FormLabel>
    <TextField 
    label="Category Name" 
    name="categoryName"
    value={formData.name}
    onChange={handleInputChange}
    fullWidth 
    // onChange={(e) => setBookName(e.target.value)} 
    style={{marginBottom:'10px'}}
    />
      
    <Button variant="contained" color="primary" onClick={postData}>
      Add 
    </Button>
  </Box>
</Drawer>
<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
    <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
      Category added successfully!
    </Alert>
  </Snackbar> 
</div>
</div>
    )
}
export default Category