import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { ProgressHelperService } from './progress-helper.service';
import { ProgressStepComponent } from './progress-step/progress-step.component';
import { Status, Step, UiHelper } from './uiHelper';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent extends UiHelper implements OnInit, AfterContentInit{
  
  itemLength!: number;
  
  @Input() public set selectedIndex(value: number) {
    this.activeIndex = value || 0;
  }
  @ContentChildren(ProgressStepComponent) public steps!: QueryList<ProgressStepComponent>;
  
  constructor(
    protected override _progressHelper: ProgressHelperService
  ) {
    super(_progressHelper);
  }
  
  ngOnInit(): void {
    this._progressHelper.eventHelper.subscribe({
      next: ({ prev, next }) => {
        if (next) {
          this.next();
        }
        if (prev) {
          this.prev();
        }
      }
    })
  }
  public prev() {
    if(this.activeIndex === this.itemLength - 1 &&
      this.itemProgressList[this.activeIndex].status === Status.COMPLETED) {
        this.undoLateComplete();
    }
    if(this.activeIndex > 0) {
      this.activeIndex--; 
      this.switchStatusPrev(this.activeIndex);
      this.setActiveStep(this.activeIndex);
    }

  }
  public next() {
    if(this.activeIndex === this.itemLength - 1 &&
      this.itemProgressList[this.activeIndex].status !== Status.COMPLETED) {
        this.completeLastStep();
    }
    if(this.activeIndex < this.itemLength - 1) {
      this.activeIndex++;
      this.switchStatusNext(this.activeIndex);
      this.setActiveStep(this.activeIndex);
    }
  }

  ngAfterContentInit(): void {
    const progressLength = this.progressSteps?.length ?? 0;
    this.initProgress(progressLength);
    this.setActiveStep(this.activeIndex);
    this.initStepIndex();
  }
  private setActiveStep(activeIndex: number) {
    if(this.stepsExist) {
      this.removeActiveStep();
      this.updateActiveStep(activeIndex);
    }
  }
  removeActiveStep() {
    this.progressSteps?.map((step) => {
      if(step.isActive) {
        step.isActive = false;
      }
    })
  }
  updateActiveStep(index: any) {
    if (this.progressSteps && this.progressSteps[index]) {
      this.progressSteps[index].activeState = this.progressSteps[index];
    }  
  }

  private initStepIndex() {
    this.progressSteps?.forEach((step, i) => (step.stepIndex = i))
  }
  
  public get activeStep(): ProgressStepComponent | undefined {
    return this.progressSteps?.[this.activeIndex];
  }
  private get progressSteps(): ProgressStepComponent[] | undefined {
    return this.steps?.toArray();
  }
  private get stepsExist(): boolean | undefined {
    return this.progressSteps && Array.isArray(this.progressSteps);
  }
  
  private initProgress(value: number):void {
    this.itemLength = value || 0;
    this.itemProgressList = this.generateProgressArray(this.itemLength);
  }
  generateProgressArray(length: number): { stepIndex: number; status: string; }[] {
    return [...Array(length).keys()].map((key) => {
      return {
        stepIndex: key,
        status: key === this.activeIndex ? Status.IN_PROGRESS : Status.PENDING
      }
    })
  }
  
  
}
