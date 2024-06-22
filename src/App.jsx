import { useState } from 'react';
import MyContextProvider from './components/MyContextProvider';

import './App.css';
import Heropage from './components/Heropage';
import Holidays from './components/Holidays';
import Messageoftheday from './components/Messageoftheday';
import Menu from './components/Menu';
import Catagory from './components/Catagory';
import Welcome from './components/Welcome';
import Navigation from './components/MegaMenuNavbar';
import MegaMenuNavbar from './components/MegaMenuNavbar';

function App() {

  return (
    <>
      <div className="app-container">
        <MyContextProvider>
          <MegaMenuNavbar />
          <Heropage />
          <Holidays />
          {/* <Messageoftheday /> */}
          <Menu />
          <Welcome />
        </MyContextProvider>
      </div>
    </>
  )
}

export default App;
