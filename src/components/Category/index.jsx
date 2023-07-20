import { Card } from "@mui/material"
import Box from '@mui/material/Box';
import { Button, Icon, Drawer, TextField, Snackbar, Alert} from '@mui/material';
import { FormLabel } from '@mui/material';
import { useState } from 'react';

const Category = () => {

    

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

    
      
      const handleSubmit = () => {
        // alert(`Name: ${name}, Email: ${email}`);
        setDrawerOpen(false);
        setOpen(true);        
      };
    return (
        <div>
        {/* <Card className="App-Card">
            <h3>Category</h3>
        </Card> */}

<div><div sx={{backgroundColor:' #6c88c8'}}><Button sx={{color:'black',backgroundColor:'rgb(108, 191, 223)' ,fontSize:'15px',marginTop:'80px',left:'80%', fontFamily:'TimesNewRoman',fontWeight:'bold'}} onClick={toggleDrawer}>Add Category</Button></div>
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
    fullWidth 
    // onChange={(e) => setBookName(e.target.value)} 
    style={{marginBottom:'10px'}}
    />
      
    <Button variant="contained" color="primary" onClick={handleSubmit}>
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