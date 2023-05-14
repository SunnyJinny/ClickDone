import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  private emailUrl = 'http://localhost:3000/send-email';
  
  constructor( private _http: HttpClient ) { }
  
  sendEmail(recipient: string, subject: string, text: string) {
    const data = {
      recipient: recipient,
      subject: subject,
      text: text
    };
    return this._http.post(this.emailUrl, data);
    
    // // Define the email options
    // const mailOptions = {
    //   from: 'clickdone.rwth@gmail.com', // Sender address
    //   to: recipient, // Recipient address
    //   subject: subject, // Subject line
    //   text: text // Plain text body
    // };

    // // Send the email
    // this.transporter.sendMail(mailOptions, function(error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });
  }
}
