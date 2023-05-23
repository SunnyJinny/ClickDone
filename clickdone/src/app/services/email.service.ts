import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  private emailUrl = `${environment.apiUrl}/send-email`;
  //private emailUrl = 'http://localhost:3000/send-email';
  
  constructor( private _http: HttpClient ) { }
  
  sendEmail(recipient: string, subject: string, text: string) {
    const data = {
      recipient: recipient,
      subject: subject,
      text: text
    };
    return this._http.post(this.emailUrl, data);
  }
}
