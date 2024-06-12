import { useState, useEffect, useContext } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import logo from '../assets/logo/panorama-logo.png';
import MyContext from './MyContext';
export const MegaMenuNavbar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
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
                  <li>BreakFast</li>
                  <li>Lunch</li>
                  <li>Dinner</li>
                </ul>

              </div>
              <div className="drinks">
              <ul>
                  <li>SoftDrinks</li>
                  <li>Beverages</li>
                  <li>Wine</li>
                </ul>

              </div>
              <div className="packages">
              <ul>
                  <li>cathering</li>
                  <li> party package</li>
                  <li>wedding package</li>
                </ul>

              </div>
            </div>
          </>
          : null
          }
      <div className="nav-container">
        <div className="logo-container"></div>
        <div className="nav-menu">
          <div className="nav-catagory" onClick={(e)=> setShowMegaMenu(!showMegaMenu)}>Catagory</div>
          <div className="nav-comment" >Comment</div>

        </div>
      </div>

    </>
  )
}

export default MegaMenuNavbar;
