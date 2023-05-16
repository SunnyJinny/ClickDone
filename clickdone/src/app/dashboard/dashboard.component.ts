import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { State } from '../models/student';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  stateCards: State[] = ['Zusage', 'Im Bewerbungsprozess', 'Fehlende Unterlagen', 'Absage'];
  constructor( private router: Router ){
    
  }
  getState(filterItem: string) {
    console.log(filterItem);
    this.router.navigate(['/students'], { queryParams : { status : filterItem }});
  }
  goForm() {
    this.router.navigate(['/student-add']);
  }
}
