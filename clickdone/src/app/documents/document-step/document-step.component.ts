import { Component, Input, OnInit } from '@angular/core';
import { SchuelerListe, Student } from 'src/app/models/schueler-liste';

@Component({
  selector: 'app-document-step',
  templateUrl: './document-step.component.html',
  styleUrls: ['./document-step.component.scss']
})
export class DocumentStepComponent implements OnInit{
  @Input() stepTitle!: string;
  @Input() inputLabel1!: string;
  @Input() inputLabel2!: string;
  @Input() inputLabel3!: string;
  @Input() inputLabel4!: string;
  @Input() inputLabel5!: string;

  purpose: string = "";
  email: string = "";
  startDatum: string = "";
  endDatum: string = "";
  title: string = "";
  content: string = "";
  students: any[] = SchuelerListe;
  selectedStudent!: Student;
  
  constructor() {}
  ngOnInit() {
    this.purpose = this.stepTitle;
  }
  
  onStudentChange(selected: any) {
    this.selectedStudent = this.students.find(student => student.name === selected.target.value);
    console.log(selected);
    console.log(this.selectedStudent);
    if (this.selectedStudent) {
      this.startDatum = this.selectedStudent.startDatum;
      this.endDatum = this.selectedStudent.endDatum;
    } else {
      this.startDatum = '';
      this.endDatum = '';
    }
  }
}
