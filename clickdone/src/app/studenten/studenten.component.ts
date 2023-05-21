import { Component, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Student  } from '../models/student';
import { StudentService } from '../services/student.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-studenten',
  templateUrl: './studenten.component.html',
  styleUrls: ['./studenten.component.scss']
})
export class StudentenComponent implements OnInit{

  displayedColumns: string[] = ['name', 'geburtsdatum', 'adresse', 'schule', 'bewerbungDatum', 'rueckmeldungDatum', 'startDatum', 'endDatum', 'status' ]
  dataSource!: MatTableDataSource<Student[]>;
  boptions = [
    { value: 'Fehlende Unterlagen', viewValue: 'Fehlende Unterlagen' },
    { value: 'Zusage', viewValue: 'Zusage' },
    { value: 'Absage', viewValue: 'Absage' },
    { value: 'Im Bewerbungsprozess', viewValue: 'Im Bewerbungsprozess' },
  ]
  poptions = [  
    { value: 'Im Praktikum', viewValue: 'Im Praktikum' },
    { value: 'Platz angenommen', viewValue: 'Platz angenommen' },
    { value: 'Frei', viewValue: 'Frei' },
    { value: 'Abgeschlossen', viewValue: 'Abgeschlossen' }
  ]
  status!: string[];
  selected: string = 'bewerber';
  filterItem!: string | null;
  
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor( 
    private router: Router, 
    private route: ActivatedRoute,
    private _studentservice: StudentService ) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.filterItem = params.get('status') || null;
    });
    switch (this.filterItem) {
      case 'Zusage':
        this.filterByStatus('Zusage');
        break;
      case 'Absage':
        this.filterByStatus('Absage');
        break;
      case 'Im Bewerbungsprozess':
        this.filterByStatus('Im Bewertungsprozess');
        break;
      case 'Fehlende Unterlagen':
        this.filterByStatus('Fehlende Unterlagen');
        break;
      case 'Im Praktikum':
        this.filterByStatus('Im Praktikum');
        break;
      case 'Platz angenommen':
        this.filterByStatus('Platz angenommen');
        break;
      default:        
        this.filterByStatus('bewerber');
        break;
    }
  }
  
  goAddPage() {
    this.router.navigate(['student-add']);
  } 
  goEditPage(id: string) {
    this.router.navigate(['/student', id]);
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
    switch (filter) {
      case 'bewerber':
        this.selected = 'bewerber';
        this.status = ['Fehlende Unterlagen', 'Zusage', 'Absage', 'Im Bewerbungsprozess'];
        break;
      case 'praktikant':
        this.selected = 'praktikant';
        this.status = ['Im Praktikum', 'Platz angenommen', 'Frei', 'Abgeschlossen'];
        break;
      default:
        this.status = [filter];
        break;
    }
    this._studentservice.filterByState(this.status).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      }
    })
  }
  goExtract() {
    let all: any;
    this._studentservice.getStudentAll().subscribe({
      next: res => {
        all = res;
      }
    })
    const pdf = new jsPDF("landscape", "mm", "a4");
    autoTable(pdf, {html: '#student-table'});
    pdf.save('table.pdf');
  }
}
