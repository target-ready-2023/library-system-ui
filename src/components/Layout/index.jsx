import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button, Icon, Snackbar, Alert } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate } from "react-router-dom";
import AddButton from "../AddBook";

import "./Layout.css";
import User from "../User";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(1),
  textAlign: "center",
  color: "black",
}));

export default function RowAndColumnSpacing() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/home");
  };

  const handleCategory = () => {
    navigate("/category");
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid container spacing={0} sx={{ height: "50vh" }}>
      <Grid
        item
        xs={1.5}
        style={{ backgroundColor: "#6c88c8" }}
        className="sidebar"
      >
        <Grid item xs={12} p={1}>
          <div>
            <Item>
              <Icon>
                <HomeIcon />
              </Icon>
              <Button
                sx={{
                  color: "black",
                  fontSize: "12px",
                  height: "30px",
                  width: "70%",
                  fontFamily: "Arial",
                }}
                onClick={handleHome}
              >
                Books Directory
              </Button>
            </Item>
          </div>
        </Grid>
        <Grid item xs={12} p={1}>
          <AddButton showSnackbar={showSnackbar} />
        </Grid>
        <Grid item xs={12} p={1}>
          <Item>
            <Icon>
              <CategoryIcon />
            </Icon>
            <Button
              sx={{
                color: "black",
                fontSize: "12px",
                height: "30px",
                width: "70%",
                fontFamily: "Arial",
              }}
              onClick={handleCategory}
            >
              Books by category
            </Button>
          </Item>
        </Grid>
        <Grid item xs={12} p={1}>
          <User />
          {/* <div>
            <Item>
              <Icon>
                <PeopleIcon />
              </Icon>
              <Button
                sx={{
                  color: "black",
                  fontSize: "12px",
                  height: "30px",
                  width: "70%",
                  fontFamily: "Arial",
                }}
                onClick={handleCategory}
              >
                Users
              </Button>
            </Item>
          </div> */}
        </Grid>
      </Grid>
      <div className="display"></div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          style={{ textAlign: "left" }}
        >
          {snackbarMessage.split("||").map((message, index) => (
            <span key={index}>
              {index > 0 && <br />}
              {message}
            </span>
          ))}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
