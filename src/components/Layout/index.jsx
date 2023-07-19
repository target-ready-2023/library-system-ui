import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './Layout.css'
import { Button, Card, Divider, Icon, colors,Drawer, TextField } from '@mui/material';
import { FormControl, FormLabel } from '@mui/material';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';  
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Title } from '@mui/icons-material';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'white',
    // ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: 'black'
}));


export default function RowAndColumnSpacing() {

    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };

    const [output, setoutput] = useState('')
    const handleHome = () => {
        navigate('/')
        // handleClose()
      }
      const handleAddBooks = () =>{
        const output = navigate('/');
        setoutput(output);
      }
      const handleSubmit = () => {
        // alert(`Name: ${name}, Email: ${email}`);
        alert('Book added successfully!')
        setDrawerOpen(false);
      };
  return (
    <Grid container spacing={0} sx={{height:'90vh'}}>
      <Grid item xs={2}
      style={{backgroundColor:'#6c88c8'}}
      className='sidebar'
      >
        {/* Content for the left side */}
                      <Grid item xs={12} p={2} >
                          <div><Item ><Icon><HomeIcon/></Icon><Button sx={{color:'black', fontSize:'15px', height:'50px', width:'70%', fontFamily:'TimesNewRoman'}} onClick={handleHome}>Books Directory</Button></Item>
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
                          </Drawer></div>
                      </Grid>
                      <Grid item xs={12} p={2} >
                          <Item ><Icon><LocalLibraryIcon/></Icon><Button sx={{color:'black', fontSize:'15px', height:'50px', width:'70%', fontFamily:'TimesNewRoman'}} onClick={toggleDrawer}>Add Books</Button></Item>
                      </Grid>
                      <Grid item xs={12} p={2} >
                          <Item ><Icon><CategoryIcon/></Icon><Button sx={{color:'black', fontSize:'15px', height:'50px', width:'70%', fontFamily:'TimesNewRoman'}}>Category</Button></Item>
                      </Grid>
      </Grid>
      {/* <Grid item xs={10} md={3}>  */}
        {/* Content for the right side */}
                      {/* <h2>Hello Jahnavi</h2> */}
                  
      {/* </Grid> */}
      <div className='display'>
      </div>
  </Grid>
); 
}