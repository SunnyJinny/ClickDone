import { Component, Input } from '@angular/core';
import { TextTemplate } from '../models/document';
import { Student } from '../models/student';
import { EmailService } from '../services/email.service';
import { StudentService } from '../services/student.service';
import { TemplateService } from '../services/template.service';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  textType!: string;
  studentsList!: any[];
  curStudent!: Student;
  
  constructor( 
    private _studentService: StudentService,
    private _templateService: TemplateService,
    private _emailService: EmailService,
    private router: Router
  ) {}
  
  setTextType(type: string) {
    this._studentService.filterByState([type]).subscribe({
      next: (data) => {
        this.textType = type,
        this.studentsList = data
      },
      error: (err) => console.log(err)
    })
  }
  
  async stepFunction() {
    let curInfo: TextTemplate = new TextTemplate();
    curInfo = this._templateService.getTemplate();
    if(curInfo.type==='Im Praktikum') {
      
      const tempText = curInfo.content.replace(/<\/?[^>]+(>|$)/g, "");
      let pdf = new jsPDF("p", "mm", "A4");
      
      pdf.setLineHeightFactor(2).setFontSize(12).text(tempText, 30, 35, {
        maxWidth: 150
      })

      pdf.save('sample.pdf');
     
    } else {
      const recipient = curInfo.email;
      const subject = curInfo.title;
      const text = curInfo.content;
      console.log(recipient, subject, text);
      
      this._emailService.sendEmail(recipient, subject, text).subscribe({
        next: () => {
          alert('Email sent successfully!');
          console.log('Email sent successfully!');
        },
        error:error => {
          alert('Sorry, Sending email Failed')
          console.log('Error sending email:', error);
        }
      });
    }
  }
  
  goBack() {
    this.router.navigate(['/students']);
  }
}
