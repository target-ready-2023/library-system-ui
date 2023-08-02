import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

const DeleteButton = ({ item }) => {
  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const deleteBook = (book_id) => {
    const deleteApiUrl = `http://localhost:8081/library_system/v1/book/${book_id}`;

    fetch(deleteApiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Book deleted successfully.");
        setData((prevData) =>
          prevData.filter((book) => book.book_id !== book_id)
        );
        setDrawerOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting the book:", error.message);
      });
  };

  const handleDelete = () => {
    if (!item) {
      console.error("No book selected for delete.");
      // Handle error or show snackbar
      return;
    }
    deleteBook(item.book_id);
  };

  return (
    <div>
      <Button className="delete-button" onClick={handleDelete}>
        <Delete />
      </Button>
    </div>
  );
};

export default DeleteButton;
