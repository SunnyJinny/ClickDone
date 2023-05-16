import { Component, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student  } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-studenten',
  templateUrl: './studenten.component.html',
  styleUrls: ['./studenten.component.scss']
})
export class StudentenComponent implements OnInit{

  displayedColumns: string[] = ['name', 'geburtsdatum', 'adresse', 'schule', 'bewerbungDatum', 'rueckmeldungDatum', 'startDatum', 'endDatum', 'status' ]
  dataSource!: MatTableDataSource<Student[]>;
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
  status!: string[];
  selected: string = 'bewerber';
  
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor( private router: Router, private _studentservice: StudentService ) {
  }

  ngOnInit(): void {
    this.filterByStatus('bewerber');
  }
  
  goAddPage() {
    this.router.navigate(['student-add']);
  } 
  goEditPage(id: string) {
    console.log(id);
    this.router.navigate(['/student', id]);
    // this.router.navigate(['/student', id], { skipLocationChange: true });
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
  filterByStatus(filter: string) {
    if(filter === 'bewerber') {
      this.selected = 'bewerber';
      this.status = ['Fehlende Unterlagen', 'Zusage', 'Absage', 'Im Bewertungsprozess'];
    } else if(filter === 'praktikant') {
      this.selected = 'praktikant';
      this.status = ['Im Praktikum', 'Platz angenommen', 'Frei', 'Abgeschlossen'];
    } 
    this._studentservice.filterByState(this.status).subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
      }
    })
  }
}
