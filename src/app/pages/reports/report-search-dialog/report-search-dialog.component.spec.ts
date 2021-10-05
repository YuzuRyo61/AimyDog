import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSearchDialogComponent } from './report-search-dialog.component';

describe('ReportSearchDialogComponent', () => {
  let component: ReportSearchDialogComponent;
  let fixture: ComponentFixture<ReportSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSearchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
