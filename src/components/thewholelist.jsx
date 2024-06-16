import { useState, useEffect, useContext } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import logo from '../assets/logo/panorama-logo.png';
import MyContext from './MyContext';
import Menujson from './Menujson'; // Adjust the path as needed

export const MegaMenuNavbar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { showSelectedItems, setShowSelectedItems } = useContext(MyContext);
  const { showMegaMenu, setShowMegaMenu } = useContext(MyContext);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  const renderMenuLinks = () => {
    return Object.keys(Menujson.hotelMenu).map(category => (
      <div key={category} className={category.toLowerCase()}>
        <ul>
          {Menujson.hotelMenu[category].map((item, index) => (
            <li key={index}>
              <a href={`#${item.name.replace(/ /g, "-")}`}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <>
      { showMegaMenu ?
        <>
          <div className="mega-menu-container" id="mega-menu">
            {renderMenuLinks()}
          </div>
        </>
        : null
      }
      <div className="nav-container">
        <div className="logo-container"></div>
        <div className="nav-menu">
          <div className="nav-catagory" onClick={(e) => { setShowMegaMenu(!showMegaMenu); setShowSelectedItems(false); }}>Catagory</div>
          <div className="nav-comment">Packages</div>
        </div>
      </div>
    </>
  );
}

export default MegaMenuNavbar;
