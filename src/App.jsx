import { useState } from 'react';

import './App.css';
import Menu from './components/Menu';
import Catagory from './components/Catagory';
import Welcome from './components/Welcome';

function App() {


  return (
    <>
      <h1> Tom Menu </h1>
      <Menu />
      <Welcome />
      <Catagory />
      
    </>
  )
}

export default App;
