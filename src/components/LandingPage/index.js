import React, { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from '../UserContext';
import AddUser from "../AddUser";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  Alert,
  Dialog,
  Snackbar,
} from "@mui/material";
const useStyles = {
  formControl: {
    margin: 16,
    minWidth: 120,
    maxWidth: 1500,
    width: "80%",
  },
  select: {
    height: "100%",
  },
  button: {
    margin: 16,
  },
  blurBackground: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0.5, 0.5, 0.5)", 
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
  const [selectedUserName,setSelectedUserName] = useState("");
  // const [userName,setUserName] = useState("");
  const [data, setData] = useState([]);
  const { userId,setUserId } = useContext(UserContext);
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

  // const fetchData = async () => {
  //   const response = await axios.get(
  //     `http://localhost:8081/library_system/v3/users`
  //   );
  //   setData(response.data);
  // };

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
  const handleOptionChange = (event) => {
    const combinedValue = event.target.value;
    const [selectedOptionValue, selectedUserNameValue] = combinedValue.split('-');
    setSelectedOption(selectedOptionValue);
    setSelectedUserName(selectedUserNameValue);
  };
  console.log("selected option " + selectedOption);
  console.log("userName " + selectedUserName);

  const handleNavigation = () => {
    console.log(selectedOption);
    setUserId(selectedOption);
    // setUserName(selectedUserName); 
    navigate("/home");
  };

  return (
   //  <div style={useStyles.blurBackground}>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Card
          className="Paper"
          style={{ width: "60%", padding: "20px", textAlign: "center" }}
        >
          <FormControl style={useStyles.formControl}>
            <InputLabel id="demo-simple-select-label">
              Select your Name
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleOptionChange}
              value={selectedUserName}
              style={useStyles.select}
            >
            {data.map((user) => (
              <MenuItem key={user.user_id} value={`${user.user_id}-${user.user_name}`}>
                {user.user_name}
              </MenuItem>
            ))}

            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            style={{ margin: "20px" }}
            className={useStyles.button}
            onClick={handleNavigation}
            disabled={!selectedOption}
          >
            proceed
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "20px" }}
            className={useStyles.button}
            onClick={handleOpenAddUserDialog}
            
          >
            Add User
          </Button>
          <Dialog open={openAddUserDialog} onClose={handleCloseAddUserDialog}>
            <AddUser handleCloseDialog={handleCloseAddUserDialog}
            setSnackbarProps={{
              setOpen: setSnackbarOpen,
              setMessage: setSnackbarMessage,
              setSeverity: setSnackbarSeverity,
            }} />
          </Dialog>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={snackbarOpen}
            autoHideDuration={8000}
            onClose={() => setSnackbarOpen(false)}
          >
            <Alert
              onClose={() => setSnackbarOpen(false)}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>

        </Card>
      </div>
   // </div>
  );
};