import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { Template, TextTemplate } from 'src/app/models/document';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-document-template',
  templateUrl: './document-template.component.html',
  styleUrls: ['./document-template.component.scss']
})
export class DocumentTemplateComponent {

  @Input() templateInfo!: TextTemplate;
  @Output() Content = new EventEmitter<string>();

  constructor( 
    private sanitizer: DomSanitizer, 
    private _fb: FormBuilder,
    private _templateService: TemplateService ) {}

  ngOnInit() {
    // if (this.templateInfo.name) {
    //   const template = document.getElementById('template');
    //   console.log(template);
    //   // this.templateInfo.content = 
    // }
  }

  @HostListener('change')
  ngOnChanges(change: SimpleChange) {
    console.log(change);
    const template = document.getElementById("pass");
    console.log(template);
  }
  
  
  
  // sendTemplate(text: any) {
  //   this.template = `<p>Praktikumszeugnis für <em><strong></strong>${ this.templateInfo.name }<strong></strong></em></p>
  //   <p><em><strong>${ this.templateInfo.name }</strong></em>, geboren am <em>Geburtsdatum</em> hat vom <em><strong>${ this.templateInfo.startDatum }</strong></em> bis <em><strong>{{ templateInfo.endDatum || 'End Datum' }}</strong></em> <em>sein/ihr</em> Schülerpraktikum in hybrider Form in der Fachgruppe Informatik der RWTH Aachen, ...</p>`
  //   text = this.template
  //   this.Content.emit(text);
  // }
  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }
}
