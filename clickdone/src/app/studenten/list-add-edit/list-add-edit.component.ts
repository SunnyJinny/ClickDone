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
      name: '',
      geburtsdatum: '',
      geschlecht: '',
      adresse: '',
      schule: '',
      betreuer: '',
      bewerbungDatum: '',
      rueckmeldungDatum: '',
      startDatum: '',
      endDatum: '',
      status: '',
      motivation: false,
      lebenslauf: false,
      zeugnis: false,
      notiz: '',
      bewertung: ''
    });
  }

  ngOnInit() {
    this.getStudent(this.route.snapshot.params['id']);
    console.log(this.listForm.value);
    if(this.listForm.value.id === undefined) {
      this.isNew = true;
    } else {
      this.isNew = false;
    }
  }

  getStudent(_id: number): void {
    this._studentService.getStudent(_id)
      .subscribe({
        next: (data) => {
          this.listForm.setValue(data);
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  onFormSubmit() {
    if(this.listForm.valid) {
      console.log(this.listForm.value);
      this._studentService.addStudent(this.listForm.value).subscribe({
        next: (res: any) => {
          alert('Die neue Liste wurde erfolgreich hinzugefügt');
          this.router.navigate(['/students']);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }
}
