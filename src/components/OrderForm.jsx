import React, {useState, useEffect, useContext} from 'react';
import MyContext from './MyContext';

const OrderForm = (prop) => {
  const {selectedItems, setSelectedItems} = useContext(MyContext);
  const [orderButtonText, setOrderButtonText] = useState("Order");
  const [customerType, setCustomerType] = useState("Inside");
  const [orderStatus, setOrderStatus] = useState("Ordered");
  const {orderLocation, setOrderLocation} = useContext(MyContext);
  const {specialRequest, setSpecialRequest} = useContext(MyContext);
  const {endpoint, setEndpoint} = useContext(MyContext);
  const {selectedTotal, setSelectedTotal} = useContext(MyContext);
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
    // setOrderLocation('');
    // setCustomerType('Inside hotel');
    // setSpecialRequest('No Special Request');


    let result = await response.json();
    if (result.code === 200) {
      setOrderStatus({success: true, message: 'Order sent successfully'});
    } else {
      setOrderStatus({success: false, message: 'Something went wrong, please try again later.'});
    }

  }
return (
  <>
 <div className="order-form">
    <input placeholder="Table|location" name="location" value ={orderLocation} onChange={(e) => setOrderLocation(e.target.value)} />
    <input placeholder="Special Request" name="location" value ={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} />

    <div className="customer-type-container">
      <div> Customer Type</div>
      <div>
        <select className="order-select">
          <option value="Inside">Inside Hotel</option>
          <option value="Outside">Outside Hotel</option>
        </select>
      </div>
    </div>
    <div className="order-button" onClick={(e)=> handleOrderClicked (e)}> {orderButtonText} </div>
  </div>
  </>
  )
}

export default OrderForm;