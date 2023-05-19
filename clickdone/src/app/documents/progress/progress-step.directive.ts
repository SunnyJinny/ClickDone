import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ProgressHelperService } from './progress-helper.service';

@Directive({
  selector: '[progressStepNext], [progressStepPrev]'
})
export class ProgressStepDirective implements OnInit {

  @Input('progressStepNext') next: any;
  @Input('progressStepPrev') prev: any; 
  
  private methods = {
    prev: false,
    next: false,
  }
  @HostListener('click', ['$event']) listen(e: any) {
    this._progressHelper.eventHelper.next(this.methods);
  }
  constructor( 
    private _progressHelper: ProgressHelperService,
    private _element: ElementRef<HTMLButtonElement>
  ) { }

  private progressStepNext() {
    this._progressHelper.eventHelper.next(this.methods);
  }
  
  ngOnInit(): void {
    this.initMethods();
    if (this.next) {
      this.progressStepNext();
    }
  }
  private initMethods() {
    if('next' in this) {
      this.methods = {
        ...this.methods,
        next: true,
      };
    }
    if('prev' in this) {
      this.methods = {
        ...this.methods,
        prev: true,
      };
    }
  }
}
