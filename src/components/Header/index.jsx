import Logo from "../Logo";
import "./header.css";

const Header = () => {
  return (
    <>
      <header className="App-header">
        <Logo />
        <h1 style={{ fontStyle: "Arial", marginLeft: "10px" }}>
          Digital Library
        </h1>
      </header>
    </>
  );
};
export default Header;
