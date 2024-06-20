import MyContext from './MyContext';
import React, { useState, useEffect } from 'react';

const MyContextProvider = ({ children }) => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);
  const [showSelectedItems, setShowSelectedItems] = useState(false);
  const [orderLocation, setOrderLocation] = useState('');
  const [specialRequest, setSpecialRequest] = useState('no request');
  // const [endpoint, setEndpoint] = useState('http://localhost:5000');
const [endpoint, setEndpoint] = useState('https://tom-menu.onrender.com');
    return (
      <MyContext.Provider value={{ endpoint, setEndpoint, showMegaMenu, setShowMegaMenu, showSelectedItems, setShowSelectedItems, orderLocation, setOrderLocation, specialRequest, setSpecialRequest}}>
        {children}
      </MyContext.Provider>
    );
  }

export default MyContextProvider;
