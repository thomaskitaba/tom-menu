// import Chief from '../assets/img/panorama-logo.png';
// import Chief2 from '../assets/img/panorama-logo.png';
import {useState, useEffect, useContext} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import MyContext from './MyContext';

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
const [status, setStatus] = useState({});
const [screenSize, setScreenSize] = useState(window.innerWidth);
const [fname, setFname] = useState('');
const [lname, setLname] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [message, setMessage] = useState('');

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

  setForm(formInitialsDetail);
  let result = await response.json();
  if (result.code === 200) {
    setStatus({success: true, message: 'Message sent successfully'});
  } else {
    setStatus({success: false, message: 'Something went wrong, please try again later.'});
  }
}

return (
  <section className="contact" id="connect">
    <Container>
      <Row className="align-items-center">
        <Col md={6}>
          {/* {screenSize > 768 ? <img src={Chief} alt="Contact image Chief standing" /> : <img src={Chief2} alt="Contact image Chief standing" />} */}
          {/* <p> Some Picture here </p> */}
        </Col>
        <Col>
          <h1>give us Comment for our Service</h1>
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
                <textarea placeholder="Comment" name="messge" value={message} onChange={ (e) => setMessage(e.target.value)} />
              </Col>
            </Row>
            <Row>
              <Col md={4} sm={4} className="px-1">
                <button type="submit" className="custom-button"><span>{buttonText}</span></button>

              </Col>
              {
                  status.message &&
                  <Col className="px-1">
                    <p className={status.success === true ? "sucess" : "danger"}></p>
                  </Col>
              }
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  </section>
)
}
export default Contact;