import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ContentChange, QuillEditorComponent } from 'ngx-quill';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ABSAGE_TEMPLATE, TextTemplate, ZUSAGE_TEMPLATE } from 'src/app/models/document';
import { Student } from 'src/app/models/schueler-liste';
import { EmailService } from 'src/app/services/email.service';
import { StudentService } from 'src/app/services/student.service';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-document-step',
  templateUrl: './document-step.component.html',
  styleUrls: ['./document-step.component.scss']
})
export class DocumentStepComponent implements OnInit{
  @Input() stepTitle!: string;
  @Input() stepType!: string;
  @Input() stepIndex!: number;
  @Input() studentsList!: any[];
  students!: any[];
  selectedStudent!: Student;
  textType!: string;
  curInfo: TextTemplate = new TextTemplate();
  isDisabled: boolean = true;
  form: FormGroup;
  @ViewChild('template', { static: true }) template!: QuillEditorComponent

  constructor( 
    private _studentService: StudentService, 
    private _templateService: TemplateService,
    private _emailService: EmailService,
    private _fb: FormBuilder ) {
      this.form = this._fb.group({
        template: '',
      })
    }
  
  ngOnInit() {
    this.curInfo = this._templateService.getTemplate();
    this.form.controls['template'].valueChanges
      .pipe(
        debounceTime(400), distinctUntilChanged()
      )
      .subscribe((data) => {
        // tslint:disable-next-line:no-console
        this.curInfo.content = data;
        // console.log(this.curInfo.content);
    })
    console.log(this.stepIndex);

  }
  ngAfterViewInit() {
    if(this.template) {
      this.template.onContentChanged
        .pipe(
          debounceTime(400),
          distinctUntilChanged()
        )
        .subscribe((data: ContentChange) => {
          // tslint:disable-next-line:no-console
          console.log('view child + directly subscription', data)
    })}
  }  
  
  @HostListener('change')
  ngOnChanges(changes: SimpleChange) {
    if(this.studentsList) {
      this.students = this.studentsList;
    }
    if(this.stepType) {
      this.curInfo.type = this.stepType;
      switch (this.curInfo.type) {
        case 'Zusage':
          this.curInfo.content = ZUSAGE_TEMPLATE('Schüler/in', 'Start Datum', 'End Datum', 'Betreuer/in');
          break;
        case 'Absage':
          this.curInfo.content = ABSAGE_TEMPLATE('Schüler/in', 'Start Datum', 'End Datum', 'Betreuer/in');
          break;
      }   
      this._templateService.setTemplate(this.curInfo);
    }
  }
  onStudentChange(selected: any) {
    this.selectedStudent = this.students?.find(student => student.name === selected.target.value);
    if (this.selectedStudent || this.curInfo.title) {
      this.curInfo.startDatum = this.selectedStudent.startDatum.split('T')[0];
      this.curInfo.endDatum = this.selectedStudent.endDatum.split('T')[0];
      this.curInfo.name = this.selectedStudent.name;
      this.curInfo.email = this.selectedStudent.email;
      this.curInfo.betreuer = this.selectedStudent.betreuer;
      if(this.curInfo.type === 'Zusage') {
        this.curInfo.content = ZUSAGE_TEMPLATE(this.curInfo.name, this.curInfo.startDatum, this.curInfo.endDatum, this.curInfo.betreuer);        
      } else if (this.curInfo.type === 'Absage') {
        this.curInfo.content = ABSAGE_TEMPLATE(this.curInfo.name, this.curInfo.startDatum, this.curInfo.endDatum, this.curInfo.betreuer);        
      }
      this.form.get('template')?.patchValue(this.curInfo.content);
      this._templateService.setTemplate(this.curInfo);
      //console.log(this._templateService.getTemplate());
    } else {
      this.curInfo.startDatum = '';
      this.curInfo.endDatum = '';
    }
    // this.curInfo.content = this.form.controls['template'].value;
    // this._templateService.setTemplate(this.curInfo);
    // console.log(this._templateService.getTemplate().content);
  }
  stepFunction() {
    if(this.stepIndex === 4) {
      const recipient = this.curInfo.email;
      const subject = this.curInfo.title;
      const text = this.curInfo.content;
      console.log(recipient, subject, text);
      // this._emailService.sendEmail(recipient, subject, text);
      
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
}
