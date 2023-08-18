import { Card, Grid } from "@mui/material";
import React from "react";

const About = () => {
  const missionText = `
    In an ever-changing digital landscape, our mission at Dream School Foundation is to redefine online library services. 
    Through cutting-edge technology, we aim to provide students with seamless access to a world of knowledge, 
    fostering a passion for learning and empowering academic excellence. 
    Our platform prioritizes convenience, interactive learning, and community engagement, 
    while promoting student well-being through holistic resources. 
    With inclusivity at the forefront, we strive to make education accessible to all. 
    Dream School Foundation's mission is to inspire, innovate, and transform online learning, 
    enabling students to thrive in the modern educational ecosystem.`;
  return (
    <Grid container spacing={0} sx={{ height: "50vh" }}>
      <div
        style={{
          marginTop: "100px",
          alignContent: "center",
          marginLeft: "175px",
        }}
      >
        <h1 style={{ textDecoration: "underline" }}>About us </h1>
        <h2 style={{ fontStyle: "italic" }}>
          Our Mission: Transforming Education Through Innovation at Dream School
          Foundation
        </h2>
        <p style={{ fontFamily: "Arial", fontSize: "18px" }}>{missionText}</p>
      </div>
    </Grid>
  );
};
export default About;
