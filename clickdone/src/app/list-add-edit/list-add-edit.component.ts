import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-list-add-edit',
  templateUrl: './list-add-edit.component.html',
  styleUrls: ['./list-add-edit.component.scss']
})
export class ListAddEditComponent {

  constructor(private _ngZone: NgZone) {}

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

}
