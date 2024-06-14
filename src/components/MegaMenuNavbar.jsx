import { useState, useEffect, useContext } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import logo from '../assets/logo/panorama-logo.png';
import MyContext from './MyContext';
export const MegaMenuNavbar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const {showSelectedItems, setShowSelectedItems} = useContext(MyContext);
  const {showMegaMenu, setShowMegaMenu} = useContext(MyContext);
  // user related
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
  }, [])
  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <>
      { showMegaMenu ?
          <>
            <div className="mega-menu-container" id="mega-menu">
              <div className="foods">
                <ul>
                  <li>
                    <a href="#Breakfast">Breakfast</a>
                  </li>
                  <li>
                    <a href="#Lunch">Lunch</a>
                  </li>
                  <li>
                    <a href="#Dinner">Dinner</a>
                  </li>
                </ul>



              </div>
              <div className="drinks">
              <ul>
                <li>
                  <a href="#soft-drinks">SoftDrinks</a>
                </li>
                <li>
                  <a href="#Beverages">Beverages</a>
                </li>
                <li>
                  <a href="#Wine">Wine</a>
                </li>
              </ul>

              </div>
              <div className="packages">
              <ul>
                <li>
                  <a href="#cathering">Cathering</a>
                </li>
                <li>
                  <a href="#party-package">Party Package</a>
                </li>
                <li>
                  <a href="#wedding-package">Wedding Package</a>
                </li>
              </ul>
              </div>
            </div>
          </>
          : null
          }
      <div className="nav-container">
        <div className="logo-container"></div>
        <div className="nav-menu">
          <div className="nav-catagory" onClick={(e)=> {setShowMegaMenu(!showMegaMenu); setShowSelectedItems(false)}}>Catagory</div>
          <div className="nav-comment" >Packages</div>
        </div>
      </div>
    </>
  )
}

export default MegaMenuNavbar;
