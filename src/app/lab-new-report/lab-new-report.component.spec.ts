import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabNewReportComponent } from './lab-new-report.component';

describe('LabNewReportComponent', () => {
  let component: LabNewReportComponent;
  let fixture: ComponentFixture<LabNewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabNewReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabNewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
