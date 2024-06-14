import Menujson from './Menujson';
import React, { useState, useEffect, useContext } from 'react';
import Catagory from './Catagory';
import MyContext from './MyContext';


const Menu = () => {
  const qty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { showMegaMenu, setShowMegaMenu } = useContext(MyContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSelectedItems, setShowSelectedItems] = useState(false);
  const [selectedButtonText, setSelectedButtonText] = useState("Selected");
  const [selectedTotal, setSelectedTotal] = useState(0);

  const [mealTypeFilter, setMealTypeFilter] = useState("");
  const [vegetarianFilter, setVegetarianFilter] = useState("");
  const [glutenFreeFilter, setGlutenFreeFilter] = useState("");
  const [countryOfOriginFilter, setCountryOfOriginFilter] = useState("");

  // Extract unique countries from the menu items
  const countries = [
    ...new Set(
      Object.values(Menujson.hotelMenu).flat().map((item) => item.countryOfOrigin)
    ),
  ];

  const handleCheckboxChange = (mealType, item) => {

    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.some(
        (selectedItem) =>
          selectedItem.name === item.name && selectedItem.mealType === mealType
      );
      if (isSelected) {
        return prevSelectedItems.filter(
          (selectedItem) =>
            !(selectedItem.name === item.name && selectedItem.mealType === mealType)
        );
      } else {
        return [...prevSelectedItems, { ...item, mealType }];
      }
    });
    // handleSelectedTotal();
  };

  const handleSelectButtonClicked = () => {
    setShowSelectedItems(!showSelectedItems);
    handleSelectedTotal();
    setSelectedButtonText(selectedButtonText === "Selected" ? "Hide" : "Selected");
  };

  const handleRemoveSelected = (index) => {
    const newSelectedItems = [...selectedItems];
    selectedItems.splice(index, 1);
    setSelectedItems(selectedItems);
    // setSelectedTotal(selectedTotal - selectedItems[i].price )
    handleSelectedTotal();
    if (selectedItems.length === 0) {
      setShowSelectedItems(false);
    }
  };

  const handleSelectedTotal = () => {
    let total = 0;
    for (let i = 0; i < selectedItems.length; i++) {
      total = total + selectedItems[i].price;
    }
    setSelectedTotal(total);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "mealTypeFilter") setMealTypeFilter(value);
    if (name === "vegetarianFilter") setVegetarianFilter(value);
    if (name === "glutenFreeFilter") setGlutenFreeFilter(value);
    if (name === "countryOfOriginFilter") setCountryOfOriginFilter(value);
  };

  return (
    <>

      <div className="floating-button-container">
        <div className="go-tp-button">
          <div className="">Meal Type:</div>
        <div className="meal-type-input">
          <label>

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
        </div>
        <div className="catagory-button"  onClick={(e) => { setShowMegaMenu(!showMegaMenu) }}> Catagory</div>
        <div className="selected-items-button" onClick={ handleSelectButtonClicked }> {selectedButtonText}
          {/* <a href="#selectedMenu"> {selectedButtonText} </a> */}
        </div>
      </div>
      <div className="hero-page">
        <div className="hero-page-text">
        {/* <h1>Welcome to</h1> */}
        </div>
        </div>
      <div className="filters-container">
      <div><h3>Filters</h3></div>
        <div className="filters">
          <label>
            Vegetarian:
            <select name="vegetarianFilter" value={vegetarianFilter} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <label>
            Gluten Free:
            <select name="glutenFreeFilter" value={glutenFreeFilter} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <label>
            Country of Origin:
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

      {Object.keys(Menujson.hotelMenu)
        .filter((mealType) => (mealTypeFilter ? mealType === mealTypeFilter : true))
        .map((mealType) => (
          <div key={mealType} className={`${mealType} `}>
            <h2>{mealType}</h2>
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
                <div key={index} className="padding-block">
                  <hr></hr>
                  <input
                    type="checkbox"
                    id={`${mealType}-${index}`}
                    checked={selectedItems.some(
                      (selectedItem) =>
                        selectedItem.name === item.name && selectedItem.mealType === mealType
                    )}


                    onChange={() => {handleCheckboxChange(mealType, item); }}
                  />

                  <label htmlFor={`${mealType}-${index}`}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <h3 className="price-text"> ${item.price.toFixed(2)}</h3>
                    <p>Vegetarian: {item.vegetarian ? "Yes" : "No"}</p>
                    <p>Gluten Free: {item.glutenFree ? "Yes" : "No"}</p>
                    <p>Country of Origin: {item.countryOfOrigin}</p>
                    <p>Quantity: {item.Quantity}</p>
                    <select name="Quantity" id="Quantity">
                      {qty.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ))}
          </div>
        ))}
      {showSelectedItems && (
        <div className="hovering-form" id="selectedMenu">
          <h2>Selected Items</h2>
          {selectedItems.length === 0 ? (
            <p>No items selected.</p>
          ) : (
            selectedItems.map((item, index) => (
              <div key={index}>
                <div className="selected-items-content flex-horizontal center-flex padding-inline">
                  <h3>{item.name}</h3>
                  <h3 className="price-text">{item.price.toFixed(2)}</h3>
                  <button className="select-button" value={index} onClick={() => handleRemoveSelected(index)}>
                    Remove
                  </button>
                </div>
                <div className="flex-horizontal">
                  <p>Vegetarian: {item.vegetarian ? "Yes" : "No"}</p>
                  <p>Gluten Free: {item.glutenFree ? "Yes" : "No"}</p>
                  <p>Country of Origin: {item.countryOfOrigin}</p>
                  <p>Meal Type: {item.mealType}</p>
                </div>
                <hr></hr>
              </div>
            ))
          )}
          <div>
            <h3>Total = {selectedTotal} birr</h3>
            <div className="refresh-total" onClick={(e)=> handleSelectedTotal()}> Refresh </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
