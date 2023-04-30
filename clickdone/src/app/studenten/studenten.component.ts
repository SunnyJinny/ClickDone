import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SchuelerListe } from '../models/schueler-liste';
import { State } from '../models/state';

@Component({
  selector: 'app-studenten',
  templateUrl: './studenten.component.html',
  styleUrls: ['./studenten.component.scss']
})
export class StudentenComponent {

  displayedColumns: string[] = ['name', 'geburtsdatum', 'adresse', 'schule', 'bewerbungDatum', 'rueckmeldungDatum', 'startDatum', 'endDatum', 'status' ]
  dataSource = SchuelerListe;  
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

  constructor( private router: Router ) {}

  goForm() {
    this.router.navigate(['list-add']);
  }
  
  clicktest() {
    console.log('test ok');
  }
}
