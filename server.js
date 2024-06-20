// const express = require("express");

// const cors = require("cors");
// const nodemailer = require("nodemailer");

import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
const router = express.Router();
// Other ES module imports


// server used to send send emails
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);


const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "thomaskitabadiary@gmail.com",
    pass: "alyh knuk rwyy dopg"
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});
router.post("/contact", (req, res) => {
  console.log('Received contact form submission:', req.body);
  const {fname, lname, phone, message, email} = req.body;
  console.log(JSON.stringify(req.body));
  // const name = req.body.firstName + req.body.lastName;
  // const fname = req.body.fname;
  // const message = req.body.message;
  // const phone = req.body.phone;
  const mail = {
    from: `${fname} ${lname}`,
    to: "thomaskitabadiary@gmail.com",
    subject: `from ${email}`,
    html: `<p>Name: ${fname} ${lname}</p>
          <p>Email: ${email}</p>
          <p>Phone: ${phone}</p>
          <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});

router.post("/order", (req, res) => {
  console.log('Received Order:', req.body);
  const {order, customerType, orderLocation, specialRequest, totalPrice} = req.body;
  console.log(JSON.stringify(req.body));

  const mail = {
    from: `${orderLocation}`,
    to: "thomaskitabadiary@gmail.com",
    subject: `location: ${orderLocation}   | CustomerType: ${customerType}`,
    html: `<p>location: ${orderLocation} </p>
          <p>customer type: ${customerType}</p>
          <p>special request: ${specialRequest}</p>
          <div> Order: ${order.map((item, index) => `<h4>${index + 1} Item: ${item.name}   | Quantity:  ${item.quantity}</h4> <p>Price=> ${item.price}  Total Price: ${totalPrice}</p>`).join('   ')}</div>
          `,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});
