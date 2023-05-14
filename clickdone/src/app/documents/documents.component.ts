import { Component, Input } from '@angular/core';
import { TextTemplate } from '../models/document';
import { Student } from '../models/schueler-liste';
import { EmailService } from '../services/email.service';
import { StudentService } from '../services/student.service';
import { TemplateService } from '../services/template.service';

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
    private _emailService: EmailService
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
  
  stepFunction() {
    let curInfo: TextTemplate = new TextTemplate();
    curInfo = this._templateService.getTemplate()
    const recipient = curInfo.email;
    const subject = curInfo.title;
    const text = curInfo.content;
    console.log(recipient, subject, text);
    
    this._emailService.sendEmail(recipient, subject, text).subscribe({
      next: response => {
        console.log('Email sent successfully!');
      },
      error:error => {
        console.log('Error sending email:', error);
      }
    });
  }
}
