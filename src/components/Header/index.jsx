import Logo from "../Logo";
import SideNavigation from "../SideNavigation";
import './header.css';

const Header = () => {
  return (
    <>
      <header  className="App-header">
        <Logo />
        <h2>Digital Library</h2>
        <SideNavigation />
      </header>
    </>
  );
};
export default Header;
