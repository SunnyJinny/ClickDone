import { Component, HostListener, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentChange, QuillEditorComponent } from 'ngx-quill';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TextTemplate, ABSAGE_TEMPLATE, ZUSAGE_TEMPLATE, ZEITPLAN_TEMPLATE, ZEUGNIS_TEMPLATE } from 'src/app/models/document';
import { Student } from 'src/app/models/student';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-document-step',
  templateUrl: './document-step.component.html',
  styleUrls: ['./document-step.component.scss']
})
export class DocumentStepComponent implements OnInit{
  @Input() stepTitle!: string;
  @Input() stepType!: string;
  @Input() stepIndex!: number;
  @Input() studentsList!: any[];
  students!: any[];
  selectedStudent!: Student;
  textType!: string;
  curInfo: TextTemplate = new TextTemplate();
  isDisabled: boolean = true;
  form: FormGroup;
  @ViewChild('template', { static: true }) template!: QuillEditorComponent

  constructor( 
    private _templateService: TemplateService,
    private _fb: FormBuilder,
    private route: ActivatedRoute ) {
      this.form = this._fb.group({
        template: '',
      })
    }
  
  async setTemplate() {
    this.form.controls['template'].valueChanges
      .pipe(
        debounceTime(400), distinctUntilChanged()
      )
      .subscribe(async (data) => {
        // tslint:disable-next-line:no-console
        this.curInfo.content = await data;
    })
  }
  
  async setContent() {
    switch(this.curInfo.type) {
      case 'Zusage':
        this.curInfo.content = ZUSAGE_TEMPLATE(this.curInfo.name, this.curInfo.startDatum, this.curInfo.endDatum, this.curInfo.betreuer);
        break;
      case 'Absage':
        this.curInfo.content = ABSAGE_TEMPLATE(this.curInfo.name, this.curInfo.startDatum, this.curInfo.endDatum, this.curInfo.betreuer);
        break;        
      case 'Platz angenommen':
        this.curInfo.content = ZEITPLAN_TEMPLATE(this.curInfo.name, this.curInfo.betreuer);
        break;        
      case 'Im Praktikum':
        this.curInfo.content = ZEUGNIS_TEMPLATE(this.curInfo.name, this.curInfo.startDatum, this.curInfo.endDatum);
        break;
    }
  }

  async ngOnInit() {
    this.curInfo = this._templateService.getTemplate(); 
    this.setTemplate();
  }
  
  ngAfterViewInit() {
    if(this.template) {
      this.template.onContentChanged
        .pipe(
          debounceTime(400),
          distinctUntilChanged()
        )
        .subscribe((data: ContentChange) => {
          // tslint:disable-next-line:no-console
          console.log('view child + directly subscription', data)
    })}
  }  
  
  @HostListener('change')
  ngOnChanges(changes: SimpleChange) {
    if(this.studentsList) {
      this.students = this.studentsList;
    }
    if(this.stepType) {
      this.curInfo.type = this.stepType;
      switch (this.curInfo.type) {
        case 'Zusage':
          this.curInfo.content = ZUSAGE_TEMPLATE('Schüler/in', 'Start Datum', 'End Datum', 'Betreuer/in');
          break;
        case 'Absage':
          this.curInfo.content = ABSAGE_TEMPLATE('Schüler/in', 'Start Datum', 'End Datum', 'Betreuer/in');
          break;
        case 'Platz angenommen':
          this.curInfo.content = ZEITPLAN_TEMPLATE('Schüler/in', 'Betreuer/in');
          break;
        case 'Im Praktikum':
          this.curInfo.content = ZEUGNIS_TEMPLATE('Schüler/in', 'Start Datum', 'End Datum');
          break;
      }   
      this._templateService.setTemplate(this.curInfo);
      if(this.curInfo.name) {
        this.setContent();
      }
    }
  }
  onStudentChange(selected: any) {
    this.selectedStudent = this.students?.find(student => student.name === selected.target.value);
    if (this.selectedStudent || this.curInfo.title) {
      this.curInfo.startDatum = this.selectedStudent.startDatum.split('T')[0];
      this.curInfo.endDatum = this.selectedStudent.endDatum.split('T')[0];
      this.curInfo.name = this.selectedStudent.name;
      this.curInfo.email = this.selectedStudent.email;
      this.curInfo.betreuer = this.selectedStudent.betreuer;
      this.setContent();
      // switch(this.curInfo.type) {
      //   case 'Zusage':
      //     this.curInfo.content = ZUSAGE_TEMPLATE(this.curInfo.name, this.curInfo.startDatum, this.curInfo.endDatum, this.curInfo.betreuer);
      //     break;
      //   case 'Absage':
      //     this.curInfo.content = ABSAGE_TEMPLATE(this.curInfo.name, this.curInfo.startDatum, this.curInfo.endDatum, this.curInfo.betreuer);
      //     break;        
      //   case 'Platz angenommen':
      //     this.curInfo.content = ZEITPLAN_TEMPLATE(this.curInfo.name, this.curInfo.betreuer);
      //     break;        
      //   case 'Im Praktikum':
      //     this.curInfo.content = ZEUGNIS_TEMPLATE(this.curInfo.name, this.curInfo.startDatum, this.curInfo.endDatum);
      //     break;
      // }
      this.form.get('template')?.patchValue(this.curInfo.content);
      this._templateService.setTemplate(this.curInfo);
    } else {
      this.curInfo.startDatum = '';
      this.curInfo.endDatum = '';
    }
    // this.curInfo.content = this.form.controls['template'].value;
    // this._templateService.setTemplate(this.curInfo);
    // console.log(this._templateService.getTemplate().content);
  }
}
