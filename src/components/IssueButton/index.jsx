import React, { useState } from "react";
import { Button } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const IssueButton = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <div>
      <button onClick={handleDecrement}>
        <RemoveCircleOutline />
      </button>
      <span>{count}</span>
      <button onClick={handleIncrement}>
        <AddCircleOutline />
      </button>
    </div>
  );
};

export default IssueButton;
