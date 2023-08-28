import DSF from "../../images/DSF_Logo.png";
import { useNavigate } from "react-router-dom";
const Logo = () => {
  const navigate = useNavigate();
  return (
    <a
      onClick={() => {
        navigate("/");
      }}
    >
      <img
        src={DSF}
        className="App-logo"
        alt="logo"
        title="Target Ready Logo"
        style={{
          marginLeft: "20px",
          marginTop: "2px",
          width: "100px",
          height: "auto",
        }}
      />
    </a>
  );
};
export default Logo;
