import {useState, useEffect, useContext} from 'react';
import MyContext from './MyContext';

const popupMessage = () => {
const {showPopupMessage, setShowPopupMessage} = useContext(MyContext);
const {status, setStatus} = useContext(MyContext);
  return (
    <>
    {showPopupMessage &&
      <>
        <div className="popup-message">
          <p>Thank you for your message. We will get back to you shortly.</p>
        </div>
      </>
    }
      </>
  )
}

export default popupMessage;
