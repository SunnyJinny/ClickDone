import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentenComponent } from './studenten.component';

describe('StudentenComponent', () => {
  let component: StudentenComponent;
  let fixture: ComponentFixture<StudentenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
