// import React, { useState, useContext, createContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import UserContext from "../UserContext";
// import AddUser from "../AddUser";
// import {
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Card,
//   Alert,
//   Dialog,
//   Snackbar,
//   Autocomplete,
//   TextField,
// } from "@mui/material";
// const useStyles = {
//   formControl: {
//     margin: 16,
//     minWidth: 120,
//     maxWidth: 1500,
//     width: "80%",
//   },
//   select: {
//     height: "100%",
//   },
//   button: {
//     margin: 16,
//   },
//   blurBackground: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0.5, 0.5, 0.5)",
//     backdropFilter: "blur(2px)",
//     zIndex: 1,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// };
// export const LandingPage = () => {
//   const navigate = useNavigate();
//   const [selectedOption, setSelectedOption] = useState("");
//   const [selectedUserName, setSelectedUserName] = useState("");
//   const [data, setData] = useState([]);
//   const { userId, setUserId } = useContext(UserContext);
//   const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   localStorage.setItem("userId", selectedOption);
//   localStorage.setItem("userName", selectedUserName);

//   const handleOpenAddUserDialog = () => {
//     setOpenAddUserDialog(true);
//   };

//   const handleCloseAddUserDialog = () => {
//     setOpenAddUserDialog(false);
//   };

//   const fetchData = async () => {
//     axios
//       .get(`http://localhost:8081/library_system/v3/AllUsers`)
//       .then((response) => {
//         console.log("Response from the server:", response.data);
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error posting data:", error);
//         if (error.response && error.response.status === 404) {
//           const errorData = error.response.data;
//           const errorMessage = errorData.message;
//           setSnackbarOpen(true);
//           setSnackbarMessage(errorMessage);
//           setSnackbarSeverity("error");
//         }
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   console.log("selected option " + selectedOption);
//   console.log("userName " + selectedUserName);

//   const handleNavigation = () => {
//     setUserId(selectedOption);
//     navigate("/home");
//   };

//   return (
//     //  <div style={useStyles.blurBackground}>
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//       }}
//     >
//       <Card
//         className="Paper"
//         style={{ width: "60%", padding: "20px", textAlign: "center" }}
//       >
//         <Autocomplete
//           options={data.map((user) => `${user.user_id}-${user.user_name}`)}
//           renderInput={(params) => (
//             <TextField {...params} label="Select a User" variant="outlined" />
//           )}
//           onInputChange={(event, newInputValue) => {
//             console.log("new " + newInputValue);
//             if (newInputValue) {
//               const [selectedOptionValue, selectedUserNameValue] =
//                 newInputValue.split("-");

//               setSelectedOption(selectedOptionValue);
//               setSelectedUserName(selectedUserNameValue);
//             } else {
//               setSelectedOption("");
//               setSelectedUserName("");
//             }
//           }}
//           value={`${selectedOption}-${selectedUserName}`}
//           style={{ minWidth: 300, maxWidth: "100%", marginBottom: 20 }}
//           disablePortal
//         />

//         <Button
//           variant="contained"
//           color="primary"
//           style={{ margin: "20px" }}
//           className={useStyles.button}
//           onClick={handleNavigation}
//           disabled={!selectedOption}
//         >
//           proceed
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           style={{ margin: "20px" }}
//           className={useStyles.button}
//           onClick={handleOpenAddUserDialog}
//         >
//           Add User
//         </Button>
//         <Dialog open={openAddUserDialog} onClose={handleCloseAddUserDialog}>
//           <AddUser
//             handleCloseDialog={handleCloseAddUserDialog}
//             setSnackbarProps={{
//               setOpen: setSnackbarOpen,
//               setMessage: setSnackbarMessage,
//               setSeverity: setSnackbarSeverity,
//             }}
//           />
//         </Dialog>
//         <Snackbar
//           anchorOrigin={{ vertical: "top", horizontal: "right" }}
//           open={snackbarOpen}
//           autoHideDuration={8000}
//           onClose={() => setSnackbarOpen(false)}
//         >
//           <Alert
//             onClose={() => setSnackbarOpen(false)}
//             severity={snackbarSeverity}
//             sx={{ width: "100%" }}
//           >
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       </Card>
//     </div>
//     // </div>
//   );
// };

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../UserContext";
import AddUser from "../AddUser";
import {
  Button,
  Card,
  Dialog,
  Snackbar,
  Autocomplete,
  TextField,
  Alert,
  Grid,
} from "@mui/material";

const useStyles = {
  formControl: {
    margin: 16,
    minWidth: 1200,
    maxWidth: 1500,
    width: "80%",
  },
  select: {
    height: "100%",
  },
  button: {
    margin: 16,
    backgroundColor: "green",
  },
  blurBackground: {
    position: "fixed",
    top: 50,
    left: 50,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(2px)",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [data, setData] = useState([]);
  const { userId, setUserId } = useContext(UserContext);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  localStorage.setItem("userId", selectedOption);
  localStorage.setItem("userName", selectedUserName);

  const handleOpenAddUserDialog = () => {
    setOpenAddUserDialog(true);
  };

  const handleCloseAddUserDialog = () => {
    setOpenAddUserDialog(false);
  };

  const fetchData = async () => {
    axios
      .get(`http://localhost:8081/library_system/v3/AllUsers`)
      .then((response) => {
        console.log("Response from the server:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
        if (error.response && error.response.status === 404) {
          const errorData = error.response.data;
          const errorMessage = errorData.message;
          setSnackbarOpen(true);
          setSnackbarMessage(errorMessage);
          setSnackbarSeverity("error");
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("selected option " + selectedOption);
  console.log("userName " + selectedUserName);

  const handleNavigation = () => {
    setUserId(selectedOption);
    navigate("/home");
  };

  return (
    <Grid container spacing={0} sx={{ height: "50vh" }}>
      <div style={useStyles.blurBackground}>
        <div
          style={{
            display: "flex",
            // flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vh",
            // position: "relative",
          }}
        >
          <Card
            className="Paper"
            style={{ width: "100%", padding: "20px", textAlign: "center" }}
          >
            <Autocomplete
              options={data.map((user) => `${user.user_id}-${user.user_name}`)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a User"
                  variant="outlined"
                />
              )}
              onInputChange={(event, newInputValue) => {
                console.log("new " + newInputValue);
                if (newInputValue) {
                  const [selectedOptionValue, selectedUserNameValue] =
                    newInputValue.split("-");

                  setSelectedOption(selectedOptionValue);
                  setSelectedUserName(selectedUserNameValue);
                } else {
                  setSelectedOption("");
                  setSelectedUserName("");
                }
              }}
              value={`${selectedOption}-${selectedUserName}`}
              style={{ minWidth: 300, maxWidth: "100%", marginBottom: 20 }}
              disablePortal
            />

            <Button
              variant="contained"
              color="primary"
              style={{
                color: "white",
                marginRight: "20px",
                backgroundColor: selectedOption ? "#6c88c8" : "grey",
              }}
              className={useStyles.button}
              onClick={handleNavigation}
              disabled={!selectedOption}
            >
              Proceed
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{
                color: "white",
                marginRight: "0px",
                backgroundColor: "green",
              }}
              className={useStyles.button}
              onClick={handleOpenAddUserDialog}
            >
              Add New User
            </Button>
            <Dialog open={openAddUserDialog} onClose={handleCloseAddUserDialog}>
              <AddUser
                handleCloseDialog={handleCloseAddUserDialog}
                setSnackbarProps={{
                  setOpen: setSnackbarOpen,
                  setMessage: setSnackbarMessage,
                  setSeverity: setSnackbarSeverity,
                }}
              />
            </Dialog>
          </Card>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
          zIndex: 3,
        }}
        style={{ marginTop: "10px", marginRight: "35px", zIndex: 3 }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%", zIndex: 3 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};
