import { config } from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
const router = express.Router();


router.post('/', (req, res) => {
  const { recipient, subject, text } = req.body;
  // const email = req.body.email;
  // const title = req.body.title;
  // const message = req.body.message;
  
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.user,
      pass: config.pass
    }
  });
  // Define the email options
  const mailOptions = {
    from: 'clickdone.rwth@gmail.com',
    to: recipient,
    subject: subject,
    html: text
  };
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

export default router;
