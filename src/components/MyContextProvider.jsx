import MyContext from './MyContext';
import React, { useState, useEffect } from 'react';

const MyContextProvider = ({ children }) => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  return (
    <MyContext.Provider value={{ showMegaMenu, setShowMegaMenu}}>
      {children}
    </MyContext.Provider>
  );

}
export default MyContextProvider;