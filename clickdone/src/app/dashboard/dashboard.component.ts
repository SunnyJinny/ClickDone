import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { State } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  stateCards: any[] = [
    { state: 'Zusage', counter: 0}, 
    { state: 'Im Bewerbungsprozess', counter: 0}, 
    { state: 'Fehlende Unterlagen', counter: 0}, 
    { state: 'Absage', counter: 0}
  ];  
  
  constructor( private router: Router, 
    private _studentService: StudentService ){ }
  
  async counterByState() {
    const zuResPromise = firstValueFrom(this._studentService.filterByState(['Zusage']));
    const prozResPromise = firstValueFrom(this._studentService.filterByState(['Im Bewerbungsprozess']));
    const fehlResPromise = firstValueFrom(this._studentService.filterByState(['Fehlende Unterlagen']));
    const abResPromise = firstValueFrom(this._studentService.filterByState(['Absage']));

    const zuRes = await zuResPromise;
    this.stateCards[0].counter = zuRes?.length ?? 0;
    const prozRes = await prozResPromise;
    this.stateCards[1].counter = prozRes?.length ?? 0;
    const fehlRes = await fehlResPromise;
    this.stateCards[2].counter = fehlRes?.length ?? 0;
    const abRes = await abResPromise;
    this.stateCards[3].counter = abRes?.length ?? 0;
  }  
    
  ngOnInit() {
    this.counterByState();
  }
  
  getState(filterItem: string) {
    this.router.navigate(['/students'], { queryParams : { status : filterItem }});
  }
  goForm() {
    this.router.navigate(['/student-add']);
  }
}
