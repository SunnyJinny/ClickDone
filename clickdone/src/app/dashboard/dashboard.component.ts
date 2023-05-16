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
  getState(state: string) {
    console.log(state);
  }
  goForm() {
    this.router.navigate(['list-add']);
  }
}
