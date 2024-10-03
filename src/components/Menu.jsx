import Menujson from './Menujson';
import React, { useState, useEffect, useContext } from 'react';
import Catagory from './Catagory';
import MyContext from './MyContext';
import { ArrowRepeat, Chat, CheckCircle, ArrowDown, Check, Basket, Trash, Book, BookFill } from 'react-bootstrap-icons';
import Contact from './Contact';
import Axios from 'axios';
import OrderForm from './OrderForm';

const Menu = () => {
  const qty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { showMegaMenu, setShowMegaMenu } = useContext(MyContext);
  const [resetClicked, setResetClicked] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);
  const { showSelectedItems, setShowSelectedItems } = useContext(MyContext);
  const [selectedButtonText, setSelectedButtonText] = useState("Selected");


  const [mealTypeFilter, setMealTypeFilter] = useState("");
  const [vegetarianFilter, setVegetarianFilter] = useState("");
  const [glutenFreeFilter, setGlutenFreeFilter] = useState("");
  const [countryOfOriginFilter, setCountryOfOriginFilter] = useState("");
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [orderButtonText, setOrderButtonText] = useState("Order");
  const [customerType, setCustomerType] = useState("Inside");
  const [orderStatus, setOrderStatus] = useState("Ordered");
  const {selectedTotal, setSelectedTotal} = useContext(MyContext);
  const {showOrderForm, setShowOrderForm} = useContext(MyContext);
  const {selectedItems, setSelectedItems} = useContext(MyContext);
  const {orderLocation, setOrderLocation} = useContext(MyContext);
  const {specialRequest, setSpecialRequest} = useContext(MyContext);
  const {endpoint, setEndpoint} = useContext(MyContext);
  // Extract unique countries from the menu items
  const countries = [
    ...new Set(
      Object.values(Menujson.hotelMenu).flat().map((item) => item.countryOfOrigin)
    ),
  ];
  const handleCheckboxChange = (mealType, item, quantity) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.some(
        (selectedItem) =>
          selectedItem.name === item.name && selectedItem.mealType === mealType
      );
      let updatedItems;
      if (isSelected) {
        updatedItems = prevSelectedItems.filter(
          (selectedItem) =>
            !(selectedItem.name === item.name && selectedItem.mealType === mealType)
        );
      } else {
        updatedItems = [...prevSelectedItems, { ...item, mealType, quantity }];
      }
      handleSelectedTotal(updatedItems);
      return updatedItems;
    });
  };
  const handleMegaMenuButtonClicked = () => {
    setShowMegaMenu(!showMegaMenu);
    // setSelectedButtonText(showSelectedItems ? "Selected" : "Hide");
    setShowSelectedItems(false);
  }
  const handleSelectButtonClicked = () => {

    setShowSelectedItems(!showSelectedItems);
    if (showSelectedItems === true) {
      setShowOrderForm(false);
    }
    setSelectedButtonText(showSelectedItems ? "Selected" : "Hide");
  };

  const handleRemoveSelected = (index) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = [...prevSelectedItems];
      newSelectedItems.splice(index, 1);
      handleSelectedTotal(newSelectedItems);
      if (newSelectedItems.length === 0) {
        setShowSelectedItems(false);
        setSelectedButtonText('Selected');
      }
      return newSelectedItems;
    });
  };

  const handleSelectedTotal = (items) => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].price * (items[i].quantity || 1);
    }
    setSelectedTotal(total.toFixed(2));
  };

  const handleResetButtonClicked = () => {
    setResetClicked(!resetClicked);
    setSelectedItems([]);
    setSelectedQuantities({});
    setSelectedTotal(0);
    setShowSelectedItems(false);
    setShowOrderForm(false);
    setSelectedButtonText('Selected');
    setMealTypeFilter('');
    setVegetarianFilter('');
    setGlutenFreeFilter('');
    setCountryOfOriginFilter('');
    // handleFilterChange();
  }

  const handleOrderClicked = async (e) => {

      e.preventDefault();
      setOrderButtonText('Ordering...');
       // TODO: test Data
      //  setSpecialRequest("without salt");
      //  setOrderLocation("Table 14");

      const formData = {
            customerType: customerType,
            orderLocation: orderLocation,
            specialRequest: specialRequest
          };

      formData.order = selectedItems;
      formData.totalPrice = selectedTotal;
      // alert(JSON.stringify(formData)); Test
      // alert(`${fname}, ${lname}, ${phone}, ${email}, ${message}`);
      let response = await fetch( `${endpoint}/order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(formData),
        });

      // TODO: reset state variables after succsful ordering
      setOrderButtonText('Order');
      // TODO: test Data
      // setOrderLocation('');
      // setCustomerType('Inside');
      // setSpecialRequest('empty');


      let result = await response.json();
      if (result.code === 200) {
        setOrderStatus({success: true, message: 'Order sent successfully'});
      } else {
        setOrderStatus({success: false, message: 'Something went wrong, please try again later.'});
      }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "mealTypeFilter") setMealTypeFilter(value);
    if (name === "vegetarianFilter") setVegetarianFilter(value);
    if (name === "glutenFreeFilter") setGlutenFreeFilter(value);
    if (name === "countryOfOriginFilter") setCountryOfOriginFilter(value);
  };

  const handleQuantityChange = (e, mealType, item) => {
    const quantity = parseInt(e.target.value, 10);
    const updatedQuantities = { ...selectedQuantities, [`${mealType}-${item.name}`]: quantity };
    setSelectedQuantities(updatedQuantities);

    setSelectedItems((prevSelectedItems) => {
      const updatedItems = prevSelectedItems.map((selectedItem) =>
        selectedItem.name === item.name && selectedItem.mealType === mealType
          ? { ...selectedItem, quantity }
          : selectedItem
      );
      handleSelectedTotal(updatedItems);
      return updatedItems;
    });
  };

  return (
    <>
     { showOrderForm &&
      <>
        <OrderForm />
      </>
      }
      <div className="floating-button-container">
        <div className="go-tp-button">
        </div>
        <div className="floating-buttons">
          <div className="reset-menu" onClick={(e)=> handleResetButtonClicked(e)}>
            {/* {resetClicked ? <ArrowRepeat className="reset-component"/> : <ArrowRepeat /> } */}
            <ArrowRepeat className="reset-component"/>
            </div>
          <div className="catagory-button" onClick={(e) =>  handleMegaMenuButtonClicked(e)}> <a href="#mega-menu">{!showMegaMenu ? <Book className="selected-component"/> : <BookFill />} </a></div>
          <div className="selected-items-button" onClick={handleSelectButtonClicked}><a href="#selected-menu">
            {
            selectedItems.length > 0 ?
            <><Basket className="catagory-component"/> </> : <><Basket /></>
            }
              </a>
          </div>
          <div className="comment-button">
          <a href="#contact"><Chat/> </a>
          </div>
        </div>

      </div>
      <div className="filters-container">
        <div><h3>Filters</h3></div>
        <div className="filters">

          <div className="filters-column">
            <div>
              <label>
         <div className="filters-lable"><div style={{display: 'flex'}}>Meal Type</div><div> የምግብ አይነት</div></div>
                <select name="mealTypeFilter" value={mealTypeFilter} onChange={handleFilterChange}>
                  <option value="">All</option>
                  {Object.keys(Menujson.hotelMenu).map((mealType) => (
                    <option key={mealType} value={mealType}>
                      {mealType}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label>
                <div className="filters-lable"><div>Vegetarian</div> <div>የጾም </div></div>
                <select name="vegetarianFilter" value={vegetarianFilter} onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
            </div>
          </div>
          <div className="filters-column">
            <div>
              <label>
                < div className="filters-lable"><div>Gluten Free </div><div> ከግሉተን ነጻ </div></div>
                <select name="glutenFreeFilter" value={glutenFreeFilter} onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
            </div>
            <div >
              <label>
                <div className="filters-lable"><div> Country </div><div> ሀገር </div></div>
                <select
                  name="countryOfOriginFilter"
                  value={countryOfOriginFilter}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
      {showSelectedItems && (
        <div className="hovering-form" id="selected-menu">
          <h2>Selected Items</h2>
          {selectedItems.length === 0 ? (
            <p>No items selected.</p>
          ) : (
            selectedItems.map((item, index) => (
              <div key={index}>
                <div className="selected-items-content flex-horizontal center-flex padding-inline">
                  <h3>{item.name}</h3>
                  <div className="price-text"><div style={{fontSize: "0.75rem"}}>Birr </div><h3> {item.price.toFixed(2)}</h3> </div>
                  <h3 className="quantity-text" > {item.quantity}  </h3>
                  <button className="select-button" onClick={() => handleRemoveSelected(index)}>
                   <Trash />
                  </button>
                </div>
                <div className="flex-horizontal">
                  <p>Vegetarian: {item.vegetarian ? "Yes" : "No"}</p>
                  <p>Gluten Free: {item.glutenFree ? "Yes" : "No"}</p>
                  <p>Country of Origin: {item.countryOfOrigin}</p>
                  <p> Meal Type: {item.mealType}</p>
                  {/* <p>Quantity: <h2 className="quantity-text"> {item.quantity} </h2></p> */}
                </div>
                <hr></hr>
              </div>
            ))
          )}
          <div className="selected-footer">
            <div>(Birr) <h3>Total = {selectedTotal} </h3></div>
            <div>
            {selectedItems.length > 0 ? <>
            {/* <div className="refresh-total" onClick={() => handleSelectedTotal(selectedItems)}> Refresh </div> */}
            <div className="order-container">
              <div className="order-button" onClick={(e)=> setShowOrderForm(!showOrderForm)}> Click to Order  </div>
              </div>
            </>
            :
            <>
              <div className="selected-items-button-2" onClick={handleSelectButtonClicked}>{selectedButtonText}</div>
            </>
            }
            </div>

          </div>
        </div>
      )}

      {Object.keys(Menujson.hotelMenu)
        .filter((mealType) => (mealTypeFilter ? mealType === mealTypeFilter : true))
        .map((mealType) => (
          <div key={mealType} className={`${mealType} menu-flex-container` }  id={`${mealType}`}>

            <h2 className="catagory-header">{mealType}</h2>

            {Menujson.hotelMenu[mealType]
              .filter((item) =>
                vegetarianFilter ? item.vegetarian.toString() === vegetarianFilter : true
              )
              .filter((item) =>
                glutenFreeFilter ? item.glutenFree.toString() === glutenFreeFilter : true
              )
              .filter((item) =>
                countryOfOriginFilter ? item.countryOfOrigin === countryOfOriginFilter : true
              )
              .map((item, index) => (
                <div key={index} className="padding-block menu-flex">
                  {/* <hr></hr> */}
                  <input
                    type="checkbox"
                    id={`${mealType}-${index}`}
                    checked={selectedItems.some(
                      (selectedItem) =>
                        selectedItem.name === item.name && selectedItem.mealType === mealType
                    )}
                    onChange={() => {
                      const quantity = selectedQuantities[`${mealType}-${item.name}`] || 1;
                      handleCheckboxChange(mealType, item, quantity);
                    }}
                  />
                  <label htmlFor={`${mealType}-${index}`}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <h3 className="price-text">birr {item.price.toFixed(2)}</h3>
                    <p>Vegetarian: {item.vegetarian ? "Yes" : "No"}</p>
                    <p>Gluten Free: {item.glutenFree ? "Yes" : "No"}</p>
                    <p>Country of Origin: {item.countryOfOrigin}</p>
                    <p className="quantity">Quantity:
                    <select
                      name="Quantity"
                      id="Quantity"
                      onChange={(e) => handleQuantityChange(e, mealType, item)}
                      value={selectedQuantities[`${mealType}-${item.name}`] || 1}
                    >
                      {qty.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    </p>
                  </label>
                </div>
              ))}

          </div>

          // TODO:
        ))}
     <Contact />
    </>
  );
};

export default Menu;
