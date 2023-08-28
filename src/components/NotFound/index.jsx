import { Card } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

const NotFound = () => {
  return (
    <Card className="App-Card">
      <h1>Oops! Nothing in here!</h1>
      <p>Here are some helpful links to get in to the system back</p>
      <Link to="/">Home</Link>
      <Link to="/contact">Contact</Link>
    </Card>
  );
};
export default NotFound;
