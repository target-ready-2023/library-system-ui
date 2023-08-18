import { Grid } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Grid container spacing={0} sx={{ height: "50vh" }}>
      <div
        style={{
          marginTop: "100px",
          alignContent: "center",
          marginLeft: "175px",
        }}
      >
        <h1 style={{ textDecoration: "underline" }}>Contact Us</h1>
        <h2 style={{ fontStyle: "italic" }}>DREAM SCHOOL FOUNDATION</h2>
        <p style={{ fontFamily: "Arial", fontSize: "18px" }}>
          <br />
          BENGALURU, KARNATAKA, INDIA
          <br />
          REACH OUT TO US VIA MAIL: libraryservice@dreamschool.in
        </p>
      </div>
    </Grid>
  );
};

export default About;
