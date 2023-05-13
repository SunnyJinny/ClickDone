import { Component, Input } from '@angular/core';
import { TextTemplate } from '../models/document';
import { Student } from '../models/schueler-liste';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  textType!: string;
  studentsList!: any[];
  curStudent!: Student;
  
  constructor( private _studentService: StudentService) {}
  
  setTextType(type: string) {
    this._studentService.filterByState([type]).subscribe({
      next: (data) => {
        this.textType = type,
        this.studentsList = data
      },
      error: (err) => console.log(err)
    })
  }
}
