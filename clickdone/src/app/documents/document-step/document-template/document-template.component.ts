import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { TextTemplate } from 'src/app/models/document';
import { ContentChange, EditorChangeContent, EditorChangeSelection, QuillEditorComponent } from 'ngx-quill';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TemplateService } from 'src/app/services/template.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-document-template',
  templateUrl: './document-template.component.html',
  styleUrls: ['./document-template.component.scss']
})
export class DocumentTemplateComponent {

  @Input() templateInfo!: TextTemplate;
  @Output() Content = new EventEmitter<string>();
  
  //@ViewChild('content', { static: true }) content!: ElementRef;
      
  constructor() {}
    
  ngOnInit() {
    // console.log(this.templateInfo);
    // if(this.templateInfo.type === 'zusage') {
    //   const temp = document.getElementById('content');
    //   const html = temp?.innerHTML;
    //   this.Content.emit(html);
    // }
  }
  
  
  // ngAfterViewInit() {
  //   if(this.content) {
  //     this.content.nativeElement.subscribe((data: ContentChange) => {
  //       console.log(data);
  //     })
  //   }
  // }
  
}
