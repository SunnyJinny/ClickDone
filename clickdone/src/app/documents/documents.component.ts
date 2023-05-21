import { Component } from '@angular/core';
import { TextTemplate } from '../models/document';
import { Student } from '../models/student';
import { EmailService } from '../services/email.service';
import { StudentService } from '../services/student.service';
import { TemplateService } from '../services/template.service';
import jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  textType!: string;
  studentsList!: any[];
  curStudent!: Student;
  receivedTemplate: TextTemplate;
  
  constructor( 
    private _studentService: StudentService,
    private _templateService: TemplateService,
    private _emailService: EmailService,
    private route: ActivatedRoute,
    private scroller: ViewportScroller
  ) {
    this.receivedTemplate = new TextTemplate();
  }
  
  ngOnInit() {
    if(this.route.queryParams) {
      this.route.queryParams.subscribe(params => {
        this.receivedTemplate.type = params['type'];
        this.receivedTemplate.name = params['name'];
        this.receivedTemplate.startDatum = params['startDatum'];
        this.receivedTemplate.endDatum = params['endDatum'];
        this.receivedTemplate.betreuer = params['betreuer'];
      });
      if (this.receivedTemplate.type) {
        this.setTextType(this.receivedTemplate.type);
      }
    }
  }
  
  setTextType(type: string) {
    this._studentService.filterByState([type]).subscribe({
      next: (data) => {
        this.textType = type,
        this.studentsList = data,
        setTimeout(() => {
          const nextButton = document.querySelector('[progressStepNext]') as HTMLButtonElement;
          if (nextButton) {
            nextButton.click();
          }
        }, 0);
      },
      error: (err) => console.log(err)
    });
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
  goFirst() {
    location.reload();
  }
  scrollToTop() {
    this.scroller.scrollToPosition([0, 0]);
  }
}
