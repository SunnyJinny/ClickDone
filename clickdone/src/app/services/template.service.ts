import { Injectable } from '@angular/core';
import { TextTemplate } from '../models/document';


@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  template: TextTemplate = new TextTemplate();
  
  setTemplate(templateData: TextTemplate) {
    this.template = templateData;
  }
  
  getTemplate(): TextTemplate {
    return this.template;
  }

  constructor() { }
}
