import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextTemplate } from 'src/app/models/document';

@Component({
  selector: 'app-document-template',
  templateUrl: './document-template.component.html',
  styleUrls: ['./document-template.component.scss']
})
export class DocumentTemplateComponent {

  @Input() templateInfo!: TextTemplate;
  @Output() Content = new EventEmitter<string>();
      
  constructor() {}
    
  ngOnInit() {

  }
  
}
