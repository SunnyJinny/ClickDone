import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private counterUrl: string = 'http://localhost:3000/counter'

  constructor(private _http: HttpClient) { }
  
  getCounter(_id: string): Observable<any> {
    return this._http.get(`${this.counterUrl}/${_id}`, { withCredentials: true });
  }
  
  createCounter(improzess: number, freiepraktika: number): Observable<any> {
    const data = { improzess, freiepraktika }
    return this._http.post(this.counterUrl, data);
  }
  
  updateCounter(id: string, improzess: number, freiepraktika: number): Observable<any> {
    const data = { improzess, freiepraktika };
    return this._http.put(`${this.counterUrl}/${id}`, data);
  }
}
