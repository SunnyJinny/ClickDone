import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  textData: any;
  
  setTextType(type: string) {
    this.loadData(type);
  }
  loadData(type: string) {
    switch (type) {
      case 'zusage':
        this.textData = 'This is data 1';
        break;
      case 'absage':
        this.textData = 'This is data 2';
        break;
      case 'zeitplan':
        this.textData = 'This is data 3';
        break;
      case 'zeugnis':
        this.textData = 'This is data 3';
        break;
      default:
        this.textData = '';
        break;
    }
  }
}
