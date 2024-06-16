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

  // Function to chunk array into multiple arrays
  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const renderMenuLinks = () => {
    // Get array of meal types (categories)
    const mealTypes = Object.keys(Menujson.hotelMenu);
    // Chunk meal types into arrays of maximum 3 items
    const chunkedMealTypes = chunkArray(mealTypes, 3);

    return chunkedMealTypes.map((chunk, index) => (
      <div key={index} className="menu-column">
        <ul>
          {chunk.map((category) => (
            <li key={category}>
              <a href={`#${category.replace(/ /g, "-")}`}>{category}</a>
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
            <div className="menu-columns">
              {renderMenuLinks()}
            </div>
          </div>
        </>
        : null
      }
      <div className="nav-container">
        <div className="logo-container"></div>
        <div className="nav-menu" onClick={(e)=> {setShowMegaMenu(!showMegaMenu)}}>
          <div className="nav-center-0"> </div>
          <div className="nav-center-1"> </div>
          <div className="nav-center-2"> </div>
          <div className="nav-catagory" onClick={(e) => { setShowMegaMenu(!showMegaMenu); setShowSelectedItems(false); }}>Catagory</div>
          <div className="nav-comment">Packages</div>
        </div>
      </div>
    </>
  );
}

export default MegaMenuNavbar;
