import React, {useState, useEffect, useContext} from 'react';
import MyContext from './MyContext';
import {checkTextExist} from './UtilityFunction';
import {X} from 'react-bootstrap-icons';

const OrderForm = (prop) => {
  const {selectedItems, setSelectedItems} = useContext(MyContext);
  const [orderButtonText, setOrderButtonText] = useState("Order");
  const [customerType, setCustomerType] = useState("Inside");
  const [orderStatus, setOrderStatus] = useState("Ordered");
  const {orderLocation, setOrderLocation} = useContext(MyContext);
  const {specialRequest, setSpecialRequest} = useContext(MyContext);
  const {endpoint, setEndpoint} = useContext(MyContext);
  const {selectedTotal, setSelectedTotal} = useContext(MyContext);
  const {showOrderForm, setShowOrderForm} = useContext(MyContext);

  const [showPopupMessageOrder, setShowPopupMessageOrder] = useState(false);
  // const {statusError, setStatusError} = useContext(MyContext);
  const {status, setStatus} = useContext(MyContext);
  const [orderStatusText, setOrderStatusText] = useState('');
  const handleOrderClicked = async (e) => {

    e.preventDefault();
    setOrderButtonText('Ordering...');
    // alert(orderLocation.length);

    if (orderLocation.length == 0) {
      setOrderButtonText('Order');
      // setStatusError(false);
      setOrderStatusText('Fill Location | ቦታ ሙላ');
      // alert(orderStatusText);
      setShowPopupMessageOrder(true);
      // handleShowMessage();
      // alert(orderStatusText);
      return;
    }

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
    // setOrderLocation('');
    // setCustomerType('Inside hotel');
    // setSpecialRequest('No Special Request');

    let result = await response.json();
    if (result.code === 200) {
      setOrderStatusText("Successful | በስኬት አዘዋል");
      setOrderButtonText('Order');
      // alert(orderStatusText);
      // setStatusError(false);
      setShowPopupMessageOrder(true);
      handleShowMessage();
    } else {
      setOrderStatusText('<div>Please Retry again or Call the waitress</div><div>እንደገና ይዘዙ ወይም አስተናጋጅዎን ይዘዙ </div>');
      // setStatusError(true);
      setShowPopupMessageOrder(true);
      handleShowMessage();
      setOrderButtonText('Order');
    }

  }
  const handleShowMessage =() => {
    setTimeout(()=> {
      setShowPopupMessageOrder(false);
      setOrderStatusText('');
    }, 10000);
  }

return (
  <>

  {selectedItems.length > 0 &&
  <>
 <div className="order-form">

    <div className="close-order-form-container" onClick={(e)=> setShowOrderForm(false)}> <X className="close-order-form"/> </div>
    <input placeholder="Table|location" name="location" value ={orderLocation} onChange={(e) => setOrderLocation(e.target.value)} />
    <input placeholder="Special Request" name="location" value ={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} />

    <div className="customer-type-container">
      <div className="cust-type"> Cust-Type</div>
      <div className="order-select-container">
        <select name="customer-type" value={customerType} onChange={(e)=> setCustomerType(e.target.value)} className="order-select">
          <option value="Inside hotel">Inside Hotel</option>
          <option value="Outside hotel">Outside Hotel</option>
        </select>
      </div>
    </div>
    <div className="order-button" onClick={(e)=> {handleOrderClicked (e); handleShowMessage()}}> {orderButtonText} </div>
    {/* {  showPopupMessage && {orderStatusText} } */}

    {showPopupMessageOrder &&
    <div> {orderStatusText}</div>
}
  </div>
  </>
}
  </>
  )
}

export default OrderForm;