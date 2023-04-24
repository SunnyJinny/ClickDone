import { Component } from '@angular/core';
import { State } from '../models/state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  stateCards: State[] = [
    {
      number: 5,
      state: 'Zusage',  
    },
    {
      number: 3,
      state: 'Im Warteposition',  
    },
    {
      number: 5,
      state: 'Fehlende Unterlagen',  
    },
    {
      number: 5,
      state: 'Absage',  
    }
  ]
  
  getState(state: string) {
    console.log(state);
  }
}
