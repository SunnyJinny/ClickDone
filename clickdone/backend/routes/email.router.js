import express from 'express';
import nodemailer from 'nodemailer';
import { nodemailerConfig as config } from '../config/config.js';
const router = express.Router();


router.post('/', (req, res) => {
  const { recipient, subject, text } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    post: 587,
    secure: false,  
    auth: {
      user: config.user,
      pass: config.pass
    }
  });
  const mailOptions = {
    from: 'clickdone.rwth@gmail.com',
    to: recipient,
    subject: subject,
    html: text
  };
  transporter.sendMail(mailOptions, (error, info) => {
    // transporter.close();
    // return 1;
    if (error) {
      console.log(error);
      res.status(500).json({error: 'Error sending email'});
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent successfully'});
    }
  });
});

export default router;
