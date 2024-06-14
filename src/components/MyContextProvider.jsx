import MyContext from './MyContext';
import React, { useState, useEffect } from 'react';

const MyContextProvider = ({ children }) => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);
  const [showSelectedItems, setShowSelectedItems] = useState(false);
  return (
    <MyContext.Provider value={{ showMegaMenu, setShowMegaMenu, showSelectedItems, setShowSelectedItems}}>
      {children}
    </MyContext.Provider>
  );

}

export default MyContextProvider;
