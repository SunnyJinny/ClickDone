import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  private studentUrl = `${environment.apiUrl}/student`;
 
  //private studentUrl = "http://localhost:3000/student";
 
  constructor( private _http: HttpClient) { }
  
  addStudent(data: any): Observable<any> {
    return this._http.post(this.studentUrl, data);
  }
  getStudentAll(): Observable<any> {
    return this._http.get(`${this.studentUrl}/list`, { withCredentials: true });
  }
  getStudent(_id: string): Observable<any> {
    return this._http.get(`${this.studentUrl}/${_id}`, { withCredentials: true });
  }
  updateStudent(_id: any, data: any): Observable<any> {
    return this._http.put(`${this.studentUrl}/${_id}`, data);
  }
  deleteStudent(_id: number): Observable<any> {
    return this._http.delete(`${this.studentUrl}/${_id}`);
  }
  filterByState(filterItem: string[]): Observable<any[]> {
    return this.getStudentAll().pipe(map(items =>  
      items.filter((item: { status: string }) => filterItem.includes(item.status))
    ));
  }
}
