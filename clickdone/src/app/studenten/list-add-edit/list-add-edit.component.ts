import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'src/app/models/schueler-liste';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-list-add-edit',
  templateUrl: './list-add-edit.component.html',
  styleUrls: ['./list-add-edit.component.scss']
})
export class ListAddEditComponent implements OnInit{
  
  status: State[] = ['Fehlende Unterlagen', 'Zusage', 'Absage', 'Im Bewerbungsprozess', 'Im Praktikum', 'Platz angenommen', 'Frei', 'Abgeschlossen'];
  listForm: FormGroup;
  isNew: boolean = true;
  
  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;
  
  constructor( 
    private _ngZone: NgZone, 
    private _fb: FormBuilder,
    private _studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.listForm = this._fb.group({   // 초기화
      _id: '',
      name: '',
      geburtsdatum: '',
      geschlecht: '',
      adresse: '',
      schule: '',
      email: '',
      bewerbungDatum: '',
      rueckmeldungDatum: '',
      betreuer: '',
      startDatum: '',
      endDatum: '',
      status: '',
      motivation: false,
      lebenslauf: false,
      zeugnis: false,
      notiz: '',
      bewertung: '',
    });
  }

  ngOnInit() {
    console.log(this.listForm);
    if(this.listForm.value._id === "") {
      this.isNew = true;
      console.log(this.isNew);
    } else {
      this.isNew = false;
      console.log(this.isNew);
      const id = this.route.snapshot.params['id'];
      this.getStudent(id);
    }
  }

  getStudent(_id: string): void {
    this._studentService.getStudent(_id)
      .subscribe({
        next: (data) => {
          this.listForm.patchValue(data);
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  onFormSubmit() {
    if(this.listForm.valid) {
      if(this.isNew) {
        this._studentService.addStudent(this.listForm.value).subscribe({
          next: (res: any) => {
            alert('Die neue Liste wurde erfolgreich hinzugefügt');
            this.router.navigate(['/students']);
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      } else {
        this._studentService.updateStudent(this.listForm.value._id, this.listForm.value).subscribe({
          next: (data) => { 
            this.listForm.patchValue = data; 
            alert('Die Liste wurde erfolgreich aktualisiert');
            this.router.navigate(['/students']);
          }
        })
      }
    } 
    
  }
}

// Delete 함수: button 만들어야 함
// this._studentService.deleteStudent(this.listForm.value._id).subscribe({
//   next: (data: any) => {
//     alert('Die List wurde erfolgreich gelöscht');
//     this.router.navigate(['/students']);
//   },
//   error: (err) => console.log(err)
// })
