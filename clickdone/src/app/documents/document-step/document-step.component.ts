import { Component, HostListener, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TextTemplate } from 'src/app/models/document';
import { Student } from 'src/app/models/schueler-liste';
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
  // content!: any; 
  // template!: string;
  // template: string = `<p>Praktikumszeugnis für <em><strong></strong>${ this.curInfo.name }<strong></strong></em></p><p><em><strong>${ this.curInfo.name }</strong></em>, geboren am <em>Geburtsdatum</em> hat vom <em><strong>${ this.curInfo.startDatum }</strong></em> bis <em><strong>${ this.curInfo.endDatum }</strong></em> <em>sein/ihr</em> Schülerpraktikum in hybrider Form in der Fachgruppe Informatik der RWTH Aachen, ...</p>`;
  // form: FormGroup = this._fb.group({
  //   template: new FormControl('')
  // });
  
    
  constructor( 
    private _studentService: StudentService, 
    private _templateService: TemplateService,
    private _fb: FormBuilder ) {
    }
  
  ngOnInit() {
    this.curInfo = this._templateService.getTemplate();
  }
  
  @HostListener('change')
  ngOnChanges(changes: SimpleChange) {
    if(this.studentsList) {
      this.students = this.studentsList;
    }
    if(this.stepType) {
      this.curInfo.type = this.stepType;
    }
  }
  onStudentChange(selected: any) {
    this.selectedStudent = this.students?.find(student => student.name === selected.target.value);
    if (this.selectedStudent) {
      this.curInfo.startDatum = this.selectedStudent.startDatum.split('T')[0];
      this.curInfo.endDatum = this.selectedStudent.endDatum.split('T')[0];
      this.curInfo.name = this.selectedStudent.name;
      this.curInfo.email = this.selectedStudent.email;
      this.curInfo.betreuer = this.selectedStudent.betreuer;
      this._templateService.setTemplate(this.curInfo);
      // console.log(this.curInfo);
    } else {
      this.curInfo.startDatum = '';
      this.curInfo.endDatum = '';
    }
  }
  // contentToText(event: any) {
  //   this.template = event;
  //   this.form.patchValue({
  //     template: this.template
  //   });
  //   console.log(this.form.value.template);
  // }
  
  extraction() {
    if(this.stepIndex === 4) {
      
    }
  }
}
