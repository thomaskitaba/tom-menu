import Menujson from './Menujson';
import React, { useState, useEffect, useContext } from 'react';
import Catagory from './Catagory';
import MyContext from './MyContext';

const Menu = () => {
  const qty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { showMegaMenu, setShowMegaMenu } = useContext(MyContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const { showSelectedItems, setShowSelectedItems } = useContext(MyContext);
  const [selectedButtonText, setSelectedButtonText] = useState("Selected");
  const [selectedTotal, setSelectedTotal] = useState(0);
  const [mealTypeFilter, setMealTypeFilter] = useState("");
  const [vegetarianFilter, setVegetarianFilter] = useState("");
  const [glutenFreeFilter, setGlutenFreeFilter] = useState("");
  const [countryOfOriginFilter, setCountryOfOriginFilter] = useState("");
  const [selectedQuantities, setSelectedQuantities] = useState({});

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

  const handleSelectButtonClicked = () => {
    setShowSelectedItems(!showSelectedItems);
    setShowMegaMenu(false);
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
    setSelectedItems([]);
    setSelectedQuantities({});
    setSelectedTotal(0);
    setShowSelectedItems(false);
    setSelectedButtonText('Selected');
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
      <div className="floating-button-container">
        <div className="go-tp-button">
          <div className="reset-menu" onClick={(e)=> handleResetButtonClicked(e)}>Reset</div>
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
        <div className="catagory-button" onClick={() => { setShowMegaMenu(!showMegaMenu); setShowSelectedItems(false); }}> <a href="#mega-menu">Catagory </a></div>
        <div className="selected-items-button" onClick={handleSelectButtonClicked}><a href="#selected-menu">{selectedButtonText}</a></div>
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
          <div key={mealType} className={`${mealType}`}  id={`${mealType}`}>
            <h2 >{mealType}</h2>
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
                    onChange={() => {
                      const quantity = selectedQuantities[`${mealType}-${item.name}`] || 1;
                      handleCheckboxChange(mealType, item, quantity);
                    }}
                  />
                  <label htmlFor={`${mealType}-${index}`}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <h3 className="price-text">${item.price.toFixed(2)}</h3>
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
        ))}
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
                  <h3 className="price-text">${item.price.toFixed(2)}</h3>
                  <h3 className="quantity-text"> {item.quantity}  </h3>
                  <button className="select-button" onClick={() => handleRemoveSelected(index)}>
                    Remove
                  </button>
                </div>
                <div className="flex-horizontal">
                  <p>Vegetarian: {item.vegetarian ? "Yes" : "No"}</p>
                  <p>Gluten Free: {item.glutenFree ? "Yes" : "No"}</p>
                  <p>Country of Origin: {item.countryOfOrigin}</p>
                  <p>Meal Type: {item.mealType}</p>
                  {/* <p>Quantity: <h2 className="quantity-text"> {item.quantity} </h2></p> */}
                </div>
                <hr></hr>
              </div>
            ))
          )}
          <div>
            <h3>Total = {selectedTotal} birr</h3>
            {selectedItems.length > 0 ? <>
            <div className="refresh-total" onClick={() => handleSelectedTotal(selectedItems)}> Refresh </div>
            </> : <>
            <div className="selected-items-button" onClick={handleSelectButtonClicked}>{selectedButtonText}</div>
            </>
            }
            </div>
        </div>
      )}
    </>
  );
};

export default Menu;
