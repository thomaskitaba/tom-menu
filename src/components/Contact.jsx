// import Chief from '../assets/img/panorama-logo.png';
// import Chief2 from '../assets/img/panorama-logo.png';
import {useState, useEffect, useContext} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import MyContext from './MyContext';
import {checkTextExist, checkEmail, checkPhone} from './UtilityFunction';
import {X} from 'react-bootstrap-icons';
const Contact = () => {
const formInitialsDetail = {
  fname: '',
  lname: '',
  email: '',
  phone: '',
  message: ''
}

const [form, setForm] = useState(formInitialsDetail);
const [buttonText, setButtonText] = useState('Comment');

const [screenSize, setScreenSize] = useState(window.innerWidth);
const [fname, setFname] = useState('');
const [lname, setLname] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [message, setMessage] = useState('');
const [statusError, setStatusError] = useState(false);

const {status, setStatus} = useContext(MyContext);
const {showPopupMessage, setShowPopupMessage} = useContext(MyContext);
let tempStatus = {success: true};
const timeValueSuccess = 5000;
const timeValueError = 3000;
// const [status, setStatus] = useState({});
// const [endpoint, setEndpoint] = useState('http://localhost:5000');
// const [endpoint, setEndpoint] = useState('https://tom-restorant.onrender.com');

const {endpoint, setEndpoint} = useContext(MyContext);
// get the width of the screen
useEffect(() => {
  const handleResize = () => setScreenSize(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  }
}, [screenSize]);

// const onFormUpdate = (formField, value) => {
//   setForm({
//     ...formField,
//     [formField]: value
//   })
// }
const handelFormSubmit = async (e) => {
  e.preventDefault();



  if (!checkTextExist(fname)) {
    // setStatus({success: false, message: 'First Name is required'});
    tempStatus.status= false;
    tempStatus.fname = 'First';
  }
  if (!checkTextExist(lname)) {
    // setStatus({success: false, message: 'First Name is required'});
    tempStatus.success = false;
    tempStatus.lname= 'Last';

  }
  if (checkEmail(email) === false) {

    // setStatus({success: false, message: 'Email is not valid'});
    tempStatus.success = false;
    tempStatus.email = 'Email';
  }
  if (checkPhone(phone) === false) {
    // setStatus({success: false, message: 'Email is not valid'});
    tempStatus.success = false;
    tempStatus.phone = 'Phone';
  }
  if (!checkTextExist(message)) {
    tempStatus.success = false;
    tempStatus.message = 'Comment';
  }
  if( tempStatus.success === false) {
    setStatus(tempStatus);
    setStatusError(true);
    // setShowPopupMessage(!showPopupMessage);
    // alert('Please fill all the fields'); // test output
    return;
  } else {
    setStatusError(false);
  }

  setButtonText('Commenting...');
  const formData = {
        fname: fname,
        lname: lname,
        phone: phone,
        email: email,
        message: message
      };

  // alert(`${fname}, ${lname}, ${phone}, ${email}, ${message}`);
  let response = await fetch( `${endpoint}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(formData),
    });

  setButtonText('Comment');
  setFname('');
  setLname('');
  setPhone('');
  setEmail('');
  setMessage('');
  setShowPopupMessage(true);
  setForm(formInitialsDetail);
  let result = await response.json();
  if (result.code === 200) {
    if (status.success === true && object.key(status).length > 0) {

      const tempStatus2 = {success: true, message: 'Message sent successfully'};
      setStatus(tempStatus2);
      // setStatus({success: true, message: 'Message sent successfully'});

      setShowPopupMessage(true);

      setStatusError(false);
        // setTimeout(() => {
        //   setShowPopupMessage(false);
        //   setStatusError(false);
        // }, 2000);
      }
  } else {
    // setStatus({success: false, message: 'Something went wrong, please try again later.'});
    setShowPopupMessage(true);
    setStatusError(false);
    // setTimeout(()=> {
    //   setShowPopupMessage(false);
    //   setStatusError(false);

    // }, 2000);
  }
}
const handleShowMessage = () => {
  setShowPopupMessage(true);
  let timeValue = 10000;
  if (tempStatus.success === false) {
    timeValue = 10000;
  }
  setTimeout(() => {
    setShowPopupMessage(false);
    setStatus({});
  }, `${timeValue}`);
}

return (
  <>
  {/* {(showPopupMessage && statusError) ?
  <>
<div>
  <p>
    {Object.entries(status).map(([key, value]) => (
      <p key={key}>{value}</p>
    ))}
  </p>
</div>
</>
: <>
  <p> Successful Comment </p>
</>

} */}
  <section className="contact" id="connect">
    <Container>
      <Row className="align-items-center">
        <Col md={6}>
          {/* {screenSize > 768 ? <img src={Chief} alt="Contact image Chief standing" /> : <img src={Chief2} alt="Contact image Chief standing" />} */}
          {/* <p> Some Picture here </p> */}
        </Col>
        <Col>
          <h1>Give us Comment for our Service</h1>
          <h1>ስለ አገልግሎታችን ያለዎትን አስተያየት ከስር ባለው ቅፅ ይላኩ</h1>
          <br></br>
          <form onSubmit={handelFormSubmit}>
            <Row>
              <Col className="px-1">
                <input type="text" placeholder="First Name" name="fname" value={fname} onChange={ (e) => setFname(e.target.value)} />
              </Col>
              <Col className="px-1">
                <input type="text" placeholder="Last Name" name="lname" value={lname} onChange={ (e) => setLname(e.target.value)} />
              </Col>
            </Row>
            <Row>
              <Col className="px-1">
                <input type="email" placeholder="Email" name="email" value={email} onChange={ (e) => setEmail(e.target.value)} />
                <input type="tel" value={phone} placeholder="Phone No." onChange={(e) => setPhone(e.target.value)}/>

                <textarea placeholder="Comment" name="message" value={message} onChange={ (e) => {setMessage(e.target.value)} } />

                 <div className={showPopupMessage ? "popup-message" : ""}>
                  <div className="close-order-form-container" onClick={(e) => {setShowPopupMessage(false); setStatusError(false)}}> <X /></div>
                  {(showPopupMessage && statusError) &&
                    <>

                    <Col className="px-1">
                      <p className="danger">Check: {status.fname && `[${status.fname}]`} {status.lname && `[${status.lname}]`} {status.phone && `[${status.phone}]`} {status.email && `[${status.email}]`} {status.message && `[${status.message}]`}</p>
                    </Col>
                    </>
                  }
                  {(showPopupMessage && !statusError ) &&
                    <>
                      <Col className="px-1">
                        <p className="success">Comment successful</p>
                      </Col>
                    </>
                  }
                  </div>
              </Col>
            </Row>
            {/* <button onClick={(e)=> alert(status.message)}> test button </button> */}
            <Row>
              <Col md={4} sm={4} className="px-1">
                <button type="submit" className="custom-button" onClick={(e)=> handleShowMessage()}><span>{buttonText}</span></button>
              </Col>

            </Row>

            {/* <Row>
            {showPopupMessage &&
                <Col className="px-1">
                  hello thomas kitaba
                  {Object.entries(status).map(([key, value])=> {
                      <p> {value} </p>
                  })}
                </Col>
              }
            </Row> */}
          </form>
        </Col>
      </Row>
    </Container>
  </section>
  </>
)
}

export default Contact;
