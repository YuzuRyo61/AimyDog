import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDetailDialogComponent } from './file-detail-dialog.component';

describe('FileDetailDialogComponent', () => {
  let component: FileDetailDialogComponent;
  let fixture: ComponentFixture<FileDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
