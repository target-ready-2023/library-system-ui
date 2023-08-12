import React, { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from '../UserContext';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  TextField,
} from "@mui/material";
// export const UserIdContext = createContext();
const useStyles = {
  formControl: {
    margin: 16,
    minWidth: 120,
    maxWidth: 1500,
    width: "30%",
  },
  select: {
    height: "100%",
  },
  button: {
    margin: 16,
  },
};
export const LandingPage = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState([]);
  const { userId,setUserId } = useContext(UserContext);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8081/library_system/v3/users`
    );
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleOptionChange = (event) => {
    
    setSelectedOption(event.target.value);
   
  };
  console.log("selected option " + selectedOption);

  const handleNavigation = () => {

    console.log(selectedOption);
    setUserId(selectedOption);
    
    navigate("/home");
  };

  return (
    
    
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
              value={selectedOption}
              onChange={handleOptionChange}
              style={useStyles.select}
            >
              {data.map((user) => (
                <MenuItem key={user.user_id} value={user.user_id}>
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
        </Card>
      </div>
    
  );
};