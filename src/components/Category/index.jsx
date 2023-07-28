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
  


    const [drawerOpen, setDrawerOpen] = useState(false);

      const [data,setData]=useState([]);
      const [open, setOpen] = useState(false);
      const [responseMessage, setResponseMessage] = useState('');
      const [categoryData,setcategoryData]=useState("false");

      const [formData, setFormData] = useState({
       
        categoryName: ''
        
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      // const handleClick = () => {
      //   setOpen(true);
      //   // handleSubmit();
      // };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    
    
  

      const handleButtonClick = (categoryName) => {
        setcategoryData(!categoryData);
        navigate('/', { state: { prop1: categoryData, prop2: categoryName } });
        // <Home propFromParent={categoryData} />
        // Home(categoryData);
       
      };
      
      const handleSubmit = () => {
        // alert(`Name: ${name}, Email: ${email}`);
        setDrawerOpen(false);
        setOpen(true);        
      };

      const postData = async (e) => {
        try {
          const response = await axios.post('http://localhost:8081/library_system/v2/inventory/category', formData);
      
          // Handle the response here
          setResponseMessage(response.data.message);
          console.log(response.data.message);
          setDrawerOpen(false);
          setOpen(true);
        } catch (error) {
          // Handle any errors here
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
        {/* <Card className="App-Card">
            <h3>Category</h3>
        </Card> */}
        
        <div style={{marginTop:'10%',height:'auto'}}>
                {data.map((item) => (
                    <div >
                      
                    <p key={item.categoryId} >
                     { <Button onClick={() => 
                    handleButtonClick(item.categoryName)
                  
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
           //position: 'fixed',
        //   top: '500px',
        //   left: '500px',
        }}>
                        {item.categoryName}
                        </Box>
                      </Button> }
                    
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
                   
                                
            </div>






 <div>
  {/* <div sx={{backgroundColor:' #6c88c8'}}><Button sx={{color:'black',backgroundColor:'rgb(108, 191, 223)' ,fontSize:'15px',marginTop:'100px',left:'80%', fontFamily:'TimesNewRoman',fontWeight:'bold'}} onClick={toggleDrawer}>Add Category</Button></div> } */}
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