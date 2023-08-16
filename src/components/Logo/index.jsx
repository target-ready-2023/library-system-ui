import DSF from "../../images/DSF_Logo.png";
import { useNavigate } from "react-router-dom";
const Logo = () => {
  const navigate= useNavigate();
  return (
    <a onClick={()=>{navigate("/")}}>
      <img src={DSF} className="App-logo" alt="logo" title="Target Ready Logo" />
    </a>
    
  );
};
export default Logo;
