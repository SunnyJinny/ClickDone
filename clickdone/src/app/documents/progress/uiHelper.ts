import { ProgressHelperService } from "./progress-helper.service";

 export enum UiState {
  ACTIVE = 'active',
  COMPLETE = 'complete'
 }
 export enum Step {
  TEXT_TYPE,
  STUDENT,
  OPTION,
  FERTIG,
  ERLEDIGT
 }
 export enum Status {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed'
 }
 
 export class UiHelper {
  public itemProgressList: { 
    stepIndex: number;
    status: string;
  }[] = [];
  public activeIndex = 0;
  
  constructor(protected _progressHelper: ProgressHelperService) {}
  
  completeLastStep() {
    this.itemProgressList[this.activeIndex].status = Status.COMPLETED;
  }
  undoLateComplete() {
    this.itemProgressList[this.activeIndex].status = Status.IN_PROGRESS;
  }
  protected switchStatusNext(index: number): void {
    this.itemProgressList[this.activeIndex - 1].status = Status.COMPLETED;
    this.itemProgressList[index].status = Status.IN_PROGRESS;
  }
  protected switchStatusPrev(index: number): void {
    this.itemProgressList[this.activeIndex + 1].status = Status.PENDING;
    this.itemProgressList[index].status = Status.IN_PROGRESS;
  }
 }
