import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TextTemplate } from 'src/app/models/document';
import { State } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { TemplateService } from 'src/app/services/template.service';

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
    private _templateService: TemplateService,
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
    this.route.params.subscribe(params => {
      this.listForm.value._id = params['id'];
    });
    switch (this.listForm.value._id) {
      case undefined:
        this.isNew = true;
        break;
      default:
        this.isNew = false;
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
  onRouting() {
    const formData = this.listForm.value;
    const tempForm: TextTemplate = new TextTemplate();
    tempForm.type = formData.status;
    tempForm.name = formData.name;
    tempForm.email = formData.email;
    tempForm.startDatum = formData.startDatum.split('T')[0];
    tempForm.endDatum = formData.endDatum.split('T')[0];
    tempForm.betreuer = formData.betreuer;
    this._templateService.setTemplate(tempForm);
    this.router.navigate(['/documents'], { queryParams: tempForm });
    console.log('저장하고 넘겨줌', tempForm); 
  }
}

// TODO: Delete 함수: button 만들어야 함
// this._studentService.deleteStudent(this.listForm.value._id).subscribe({
//   next: (data: any) => {
//     alert('Die List wurde erfolgreich gelöscht');
//     this.router.navigate(['/students']);
//   },
//   error: (err) => console.log(err)
// })
