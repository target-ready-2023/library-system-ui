import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const ReadMoreButton = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    //     <div>
    //       <Button variant="contained" color="primary" onClick={handleOpen}>
    //         <ReadMoreIcon />
    //       </Button>
    //       <Dialog open={open} onClose={handleClose}>
    //         {data.map((item) => (
    //           <>
    //             <DialogTitle key={item.book_id}>{item.book_name}</DialogTitle>
    //             <DialogContent>{item.book_description}</DialogContent>
    //           </>
    //         ))}
    //         <DialogActions>
    //           <Button onClick={handleClose} color="primary">
    //             Close
    //           </Button>
    //         </DialogActions>
    //       </Dialog>
    //     </div>
    //   );
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <ReadMoreOutlinedIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book Details</DialogTitle>
        <div>
          {data.map((item) => (
            <DialogContent key={item.book_id}>
              {item.book_description}
            </DialogContent>
          ))}
        </div>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReadMoreButton;
