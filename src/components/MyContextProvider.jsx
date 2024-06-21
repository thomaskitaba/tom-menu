import MyContext from './MyContext';
import React, { useState, useEffect } from 'react';


const MyContextProvider = ({ children }) => {
  const holidayKey = import.meta.env.VITE_HOLIDAYKEY;
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);
  const [showSelectedItems, setShowSelectedItems] = useState(false);
  const [orderLocation, setOrderLocation] = useState('');
  const [specialRequest, setSpecialRequest] = useState('No Special Request');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedTotal, setSelectedTotal] = useState(0);
  // const [endpoint, setEndpoint] = useState('http://localhost:5000');
  const [endpoint, setEndpoint] = useState('https://tom-menu.onrender.com');
    return (
      <MyContext.Provider value={{ endpoint, setEndpoint, selectedItems, setSelectedItems, showMegaMenu, setShowMegaMenu, showSelectedItems, setShowSelectedItems, orderLocation, setOrderLocation, specialRequest, setSpecialRequest, showOrderForm, setShowOrderForm, selectedTotal, setSelectedTotal}}>
        {children}
      </MyContext.Provider>
    );
  }

export default MyContextProvider;
