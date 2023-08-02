// // // import React from "react";
// import UpdateButton from "../UpdateButton";
// import DeleteButton from "../DeleteButton";
// // import IssueButton from "../IssueButton";
// // import ReadMoreIcon from "@mui/icons-material/ReadMore";
// // import React, { useEffect, useState } from "react";
// // import { Button } from "@mui/material";
// // import Dialog from "@mui/material/Dialog";
// // import DialogTitle from "@mui/material/DialogTitle";
// // import DialogContent from "@mui/material/DialogContent";
// // import DialogActions from "@mui/material/DialogActions";
// // import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";

// // const TableComponent = ({ data }) => {
// //   const [open, setOpen] = useState(false);
// //   const [openDialogs, setOpenDialogs] = useState([]);

// //   const handleOpen = (index) => {
// //     const newOpenDialogs = [...openDialogs];
// //     newOpenDialogs[index] = true;
// //     setOpenDialogs(newOpenDialogs);
// //   };

// //   const handleClose = (index) => {
// //     const newOpenDialogs = [...openDialogs];
// //     newOpenDialogs[index] = false;
// //     setOpenDialogs(newOpenDialogs);
// //   };

// //   const tableStyles = {
// //     width: "90%",
// //     borderCollapse: "collapse",
// //     marginLeft: "100px",
// //     overflowX: "auto",
// //     // border: "1px solid black",
// //     // rowHeight: "10%",
// //   };

// //   const thStyles = {
// //     width: "80px",
// //     backgroundColor: "#f2f2f2",
// //     borderBottom: "1px solid #ddd",
// //     padding: "10px",
// //     textAlign: "center",
// //     fontSize: "18px",
// //     border: "1px solid black",
// //   };

// //   const tdStyles = {
// //     width: "80px",
// //     borderBottom: "1px solid #ddd",
// //     padding: "10px",
// //     textAlign: "center",
// //     fontSize: "16px",
// //     border: "1px solid black",
// //   };

// //   const tdStylesUD = {
// //     display: "flex",
// //     width: "10px",
// //     borderBottom: "1px solid #ddd",
// //     padding: "5px",
// //     marginLeft: "10%",
// //     Align: "center",
// //     fontSize: "16px",
// //     border: "1px solid black",
// //   };
// //   const dataWithSerialNumber = data.map((item, index) => ({
// //     ...item,
// //     serialNumber: index + 1,
// //   }));

// //   return (
// //     <table style={tableStyles}>
// //       <thead>
// //         <tr>
// //           <th style={thStyles}>No.</th>
// //           <th style={thStyles}>Book Name</th>
// //           {/* <th style={thStyles}>Book Description</th> */}
// //           {/* <th style={thStyles}>Category Name</th> */}
// //           <th style={thStyles}>Author Name</th>
// //           <th style={thStyles}>Publication Year</th>
// //           {/* <th style={thStyles}>Issue Book</th> */}
// //           <th style={thStyles}>Actions</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {dataWithSerialNumber.map((item, index) => (
// //           <tr key={item.book_id}>
// //             <td style={tdStyles}>{item.serialNumber}</td>
// //             <td style={tdStyles}>{item.book_name}</td>
// //             {/* <td style={tdStyles}>{item.book_description}</td> */}
// //             {/* <td style={tdStyles}>Category Name</td> */}
// //             <td style={tdStyles}>{item.author_name}</td>
// //             <td style={tdStyles}>{item.publication_year}</td>
// //             {/* <td style={tdStyles}>
// //               <IssueButton />
// //             </td> */}
// //             <td style={tdStylesUD}>
// //               <UpdateButton item={item} />
// //             </td>
// //             <td style={tdStylesUD}>
// //               <DeleteButton item={item} />
// //             </td>

// //             <td style={tdStylesUD}>
// //               {/* <Button variant="contained" color="primary" onClick={handleOpen}>
// //                 <ReadMoreOutlinedIcon />
// //               </Button>
// //               <Dialog open={open} onClose={handleClose}>
// //                 <DialogTitle>{item.book_name}</DialogTitle>

// //                 <DialogContent>{item.book_description}</DialogContent>

// //                 <DialogActions>
// //                   <Button onClick={handleClose} color="primary">
// //                     Close
// //                   </Button>
// //                 </DialogActions>
// //               </Dialog> */}
// //               <Button onClick={() => handleOpen(index)}>
// //                 <ReadMoreOutlinedIcon />
// //               </Button>
// //               <Dialog
// //                 open={openDialogs[index]}
// //                 onClose={() => handleClose(index)}
// //               >
// //                 <DialogTitle>{item.book_name}</DialogTitle>
// //                 <DialogContent>{item.book_description}</DialogContent>
// //                 <DialogActions>
// //                   <Button onClick={() => handleClose(index)} color="primary">
// //                     Close
// //                   </Button>
// //                 </DialogActions>
// //               </Dialog>
// //             </td>
// //           </tr>
// //         ))}
// //       </tbody>
// //     </table>
// //   );
// // };

// // export default TableComponent;

// import React, { useState } from "react";
// import {
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// const TableComponent = ({ data, deleteBook }) => {
//   const [openDialogs, setOpenDialogs] = useState([]);

//   const handleOpen = (index) => {
//     const newOpenDialogs = [...openDialogs];
//     newOpenDialogs[index] = true;
//     setOpenDialogs(newOpenDialogs);
//   };

//   const handleClose = (index) => {
//     const newOpenDialogs = [...openDialogs];
//     newOpenDialogs[index] = false;
//     setOpenDialogs(newOpenDialogs);
//   };

//   const dataWithSerialNumber = data.map((item, index) => ({
//     ...item,
//     serialNumber: index + 1,
//   }));

//   const tableContainerStyles = {
//     maxWidth: "900px",
//     margin: "0 auto",
//     borderRadius: "8px",
//     overflow: "hidden",
//   };

//   const tableStyles = {
//     width: "100%",
//     tableLayout: "fixed",
//   };

//   const tableHeaderCellStyles = {
//     backgroundColor: "#f2f2f2",
//     borderBottom: "1px solid #ddd",
//     fontSize: "18px",
//     fontWeight: "bold",
//     padding: "12px",
//     textAlign: "center",
//   };

//   const tdStyles = {
//     borderBottom: "1px solid #ddd",
//     padding: "10px",
//     textAlign: "center",
//     fontSize: "16px",
//   };

//   const actionButtonsStyles = {
//     display: "flex",
//     justifyContent: "center",
//     gap: "10px",
//   };

//   const handleDelete = (bookId) => {
//     // Implement your delete logic here
//     deleteBook(bookId);
//   };

//   return (
//     <TableContainer component={Paper} style={tableContainerStyles}>
//       <Table style={tableStyles}>
//         <TableHead>
//           <TableRow>
//             <TableCell style={tableHeaderCellStyles} align="center">
//               No.
//             </TableCell>
//             <TableCell style={tableHeaderCellStyles} align="center">
//               Book Name
//             </TableCell>
//             <TableCell style={tableHeaderCellStyles} align="center">
//               Author Name
//             </TableCell>
//             <TableCell style={tableHeaderCellStyles} align="center">
//               Publication Year
//             </TableCell>
//             <TableCell style={tableHeaderCellStyles} align="center">
//               Actions
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {dataWithSerialNumber.map((item, index) => (
//             <TableRow key={item.book_id}>
//               <TableCell align="center">{item.serialNumber}</TableCell>
//               <TableCell align="center">{item.book_name}</TableCell>
//               <TableCell align="center">{item.author_name}</TableCell>
//               <TableCell align="center">{item.publication_year}</TableCell>
//               <TableCell align="center" style={tdStyles}>
//                 <div style={actionButtonsStyles}>
//                   <IconButton onClick={() => handleOpen(index)} color="primary">
//                     <VisibilityIcon />
//                   </IconButton>
//                   <UpdateButton item={item} />
//                   {/* <IconButton onClick={<DeleteButton />} color="secondary">
//                     <DeleteIcon />
//                   </IconButton> */}
//                   <DeleteButton item={item} />
//                 </div>
//                 <Dialog
//                   open={openDialogs[index]}
//                   onClose={() => handleClose(index)}
//                 >
//                   <DialogTitle>{item.book_name}</DialogTitle>
//                   <DialogContent>{item.book_description}</DialogContent>
//                   <DialogActions>
//                     <Button onClick={() => handleClose(index)} color="primary">
//                       Close
//                     </Button>
//                   </DialogActions>
//                 </Dialog>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default TableComponent;
import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateButton from "../UpdateButton";
import DeleteButton from "../DeleteButton";

const TableComponent = ({ data, deleteBook }) => {
  const [openDialogs, setOpenDialogs] = useState([]);

  const handleOpen = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = true;
    setOpenDialogs(newOpenDialogs);
  };

  const handleClose = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = false;
    setOpenDialogs(newOpenDialogs);
  };

  const dataWithSerialNumber = data.map((item, index) => ({
    ...item,
    serialNumber: index + 1,
  }));

  const tableContainerStyles = {
    maxWidth: "900px",
    margin: "0 auto",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const tableStyles = {
    width: "100%",
    tableLayout: "fixed",
  };

  const tableHeaderCellStyles = {
    backgroundColor: "#f2f2f2",
    borderBottom: "1px solid #ddd",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "12px",
    textAlign: "center",
  };

  const tdStyles = {
    borderBottom: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
    fontSize: "16px",
  };

  const actionButtonsStyles = {
    display: "flex",
    justifyContent: "center",
    gap: "0.5px", // Reduce the gap between icons here
  };

  const handleDelete = (bookId) => {
    // Implement your delete logic here
    deleteBook(bookId);
  };

  return (
    <TableContainer component={Paper} style={tableContainerStyles}>
      <Table style={tableStyles}>
        <TableHead>
          <TableRow>
            <TableCell style={tableHeaderCellStyles} align="center">
              No.
            </TableCell>
            <TableCell style={tableHeaderCellStyles} align="center">
              Book Name
            </TableCell>
            <TableCell style={tableHeaderCellStyles} align="center">
              Author Name
            </TableCell>
            <TableCell style={tableHeaderCellStyles} align="center">
              Publication Year
            </TableCell>
            <TableCell style={tableHeaderCellStyles} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataWithSerialNumber.map((item, index) => (
            <TableRow key={item.book_id}>
              <TableCell align="center">{item.serialNumber}</TableCell>
              <TableCell align="center">{item.book_name}</TableCell>
              <TableCell align="center">{item.author_name}</TableCell>
              <TableCell align="center">{item.publication_year}</TableCell>
              <TableCell align="center" style={tdStyles}>
                <div style={actionButtonsStyles}>
                  <IconButton onClick={() => handleOpen(index)} color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <UpdateButton item={item} />
                  <DeleteButton item={item} />
                </div>
                <Dialog
                  open={openDialogs[index]}
                  onClose={() => handleClose(index)}
                >
                  <DialogTitle>{item.book_name}</DialogTitle>
                  <DialogContent>{item.book_description}</DialogContent>
                  <DialogActions>
                    <Button onClick={() => handleClose(index)} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
