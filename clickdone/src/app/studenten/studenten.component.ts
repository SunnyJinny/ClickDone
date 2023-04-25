import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SchuelerListe } from '../models/schueler-liste';

@Component({
  selector: 'app-studenten',
  templateUrl: './studenten.component.html',
  styleUrls: ['./studenten.component.scss']
})
export class StudentenComponent {

  displayedColumns: string[] = ['name', 'geburtsdatum', 'adresse', 'schule', 'bewerbungDatum', 'rueckmeldungDatum', 'startDatum', 'endDatum', 'status' ]
  dataSource = SchuelerListe;  

  constructor( private router: Router ) {}

  goForm() {
    this.router.navigate(['list-add']);
  }
}
