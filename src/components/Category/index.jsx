import { Card } from "@mui/material"
import Box from '@mui/material/Box';
import { Button, Icon, Drawer, TextField, Snackbar, Alert} from '@mui/material';
import { FormLabel } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const Category = () => {

    

    const [drawerOpen, setDrawerOpen] = useState(false);

    
      const [open, setOpen] = useState(false);
      const [responseMessage, setResponseMessage] = useState('');

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
    

    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
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
    return (
        <div>
        {/* <Card className="App-Card">
            <h3>Category</h3>
        </Card> */}

<div><div sx={{backgroundColor:' #6c88c8'}}><Button sx={{color:'black',backgroundColor:'rgb(108, 191, 223)' ,fontSize:'15px',marginTop:'100px',left:'80%', fontFamily:'TimesNewRoman',fontWeight:'bold'}} onClick={toggleDrawer}>Add Category</Button></div>
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