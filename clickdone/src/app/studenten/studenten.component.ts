import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Student  } from '../models/schueler-liste';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-studenten',
  templateUrl: './studenten.component.html',
  styleUrls: ['./studenten.component.scss']
})
export class StudentenComponent implements OnInit{

  displayedColumns: string[] = ['name', 'geburtsdatum', 'adresse', 'schule', 'bewerbungDatum', 'rueckmeldungDatum', 'startDatum', 'endDatum', 'status' ]
  dataSource!: MatTableDataSource<Student>;
  
  options = [
    { value: 'fehlendeUnterlagen', viewValue: 'Fehlende Unterlagen' },
    { value: 'zusage', viewValue: 'Zusage' },
    { value: 'absage', viewValue: 'Absage' },
    { value: 'bewerbungsprozess', viewValue: 'Im Bewerbungsprozess' },
    { value: 'praktikum', viewValue: 'Im Praktikum' },
    { value: 'platz', viewValue: 'Platz angenommen' },
    { value: 'frei', viewValue: 'Frei' },
    { value: 'abgeschlossen', viewValue: 'Abgeschlossen' }
  ]

  @ViewChild(MatSort) sort!: MatSort;
  
  constructor( private router: Router, private _studentservice: StudentService ) {
  }

  ngOnInit(): void {
    this.getStudentAll();
  }
  goAddPage() {
    this.router.navigate(['list-add']);
  } 
  goEditPage(data: any) {
    this.router.navigate(['/student', data], { skipLocationChange: true });
  }
  getStudentAll() {
    this._studentservice.getStudentAll().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
