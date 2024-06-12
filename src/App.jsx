import { useState } from 'react';
import MyContextProvider from './components/MyContextProvider';

import './App.css';
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
          <Menu />
          <Welcome />
        </MyContextProvider>
      </div>
    </>
  )
}

export default App;
