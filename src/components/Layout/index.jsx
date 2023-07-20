import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './Layout.css'
import { Button, Icon, Drawer, TextField, Snackbar, Alert} from '@mui/material';
import { FormLabel } from '@mui/material';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';  
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import axios from 'axios';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'white',
    // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'black'
}));


export default function RowAndColumnSpacing() {

  const [formData, setFormData] = useState({
    booName: '',
    bookDescription: '',
    categoryName: '',
    authorName: '',
    publicationYear: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
      const [open, setOpen] = useState(false);

      
      const postData = async (e) => {
        try {
          const response = await axios.post('http://localhost:8081/library_system/v1/inventory/books', formData);
      
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
    

    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };

    const handleHome = () => {
        navigate('/')
        // handleClose()
      }
      const handleCategory = () =>{
        navigate('/category');
      }
      const handleSubmit = () => {
        // alert(`Name: ${name}, Email: ${email}`);
        
        setOpen(true);        
      };
  return (
    <Grid container spacing={0}
     sx={{height:'90vh'}}
    >
      <Grid item xs={2}
      style={{backgroundColor:'#6c88c8'}}
      className='sidebar'
      >
        {/* Content for the left side */}
                      <Grid 
                      item xs={12} 
                      p={2} 
                      >
                          <div><Item ><Icon><HomeIcon/></Icon><Button sx={{color:'black', fontSize:'15px', height:'50px', width:'70%', fontFamily:'TimesNewRoman'}} onClick={handleHome}>Books Directory</Button></Item></div>
                      </Grid>
                      <Grid item xs={12} p={2} >
                          <div><Item ><Icon><LocalLibraryIcon/></Icon><Button sx={{color:'black', fontSize:'15px', height:'50px', width:'70%', fontFamily:'TimesNewRoman'}} onClick={toggleDrawer}>Add Books</Button></Item>
                          <Drawer
                            anchor="bottom"
                            open={drawerOpen}
                            onClose={() => setDrawerOpen(false)}
                            PaperProps={{ style: { height: '70%', alignItems: 'center', justifyContent: 'center'} }}
                          >
                            <Box p={2} style={{border:'black'}}>
                              <FormLabel sx={{marginBottom:'10px', fontFamily:'TimesNewRoman', fontSize:'50px'}}>Book Details</FormLabel>
                              <TextField 
                              label="Book Name" 
                              name= "bookName" 
                              value={formData.name}
                              onChange={handleInputChange}
                              fullWidth  
                              style={{marginBottom:'10px'}}
                              />
                                <TextField 
                              label="Book Description" 
                              name="bookDescription"
                              value={formData.name}
                              onChange={handleInputChange}
                              fullWidth 
                              // onChange={(e) => setBookDescription(e.target.value)}
                              style={{marginBottom:'10px'}}
                              />
                              <TextField 
                              label="Category Name" 
                              name="categoryName"
                              value={formData.name}
                              onChange={handleInputChange}
                              fullWidth 
                              style={{marginBottom:'10px'}}
                              />

                              <TextField 
                              label="Author Name" 
                              name="authorName"
                              value={formData.name}
                              onChange={handleInputChange}
                              fullWidth 
                              style={{marginBottom:'10px'}} 
                              />

                              <TextField 
                              label="Publication Year" 
                              name="publicationYear"
                              value={formData.name}
                              onChange={handleInputChange}
                              fullWidth 
                              style={{marginBottom:'10px'}}
                              />
                              <Button variant="contained" color="primary" onClick={postData}>
                                Add
                              </Button>
                            </Box>
                          </Drawer>
                          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
                              <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
                                Book added successfully!
                              </Alert>
                            </Snackbar> 
                          </div>
                      </Grid>
                      <Grid item xs={12} p={2} >
                          <Item ><Icon><CategoryIcon/></Icon><Button sx={{color:'black', fontSize:'15px', height:'50px', width:'70%', fontFamily:'TimesNewRoman'}} onClick={handleCategory}>Category</Button></Item>
                      </Grid>
      </Grid>
      {/* <Grid className='rightGrid' > 
        {/* Content for the right side */}
                      {/* <h2>Hello Jahnavi udhffiuhuishfdiuhsihjjckhuidhufhwiuhsiufs;jgouf</h2> */}
                  
      {/* </Grid> */}
      
      <div className='display'>
      </div>
  </Grid>
  ); 
}