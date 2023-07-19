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
import { useState } from 'react';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'white',
    // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'black'
}));


export default function RowAndColumnSpacing() {

    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);

    
      const [open, setOpen] = useState(false);
    
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
        setDrawerOpen(false);
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
                              fullWidth 
                              // onChange={(e) => setBookName(e.target.value)} 
                              style={{marginBottom:'10px'}}
                              />
                                <TextField 
                              label="Book Description" 
                              fullWidth 
                              // onChange={(e) => setBookDescription(e.target.value)}
                              style={{marginBottom:'10px'}}
                              />
                              <TextField 
                              label="Category Name" 
                              fullWidth 
                              // onChange={(e) => setCategoryName(e.target.value)} 
                              style={{marginBottom:'10px'}}
                              />

                              <TextField 
                              label="Author Name" 
                              fullWidth 
                              // onChange={(e) => setAuthorName(e.target.value)}
                              style={{marginBottom:'10px'}} 
                              />

                              <TextField 
                              label="Publication Year" 
                              fullWidth 
                              // onChange={(e) => setPublicationYear(e.target.value)} 
                              style={{marginBottom:'10px'}}
                              />
                              <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
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