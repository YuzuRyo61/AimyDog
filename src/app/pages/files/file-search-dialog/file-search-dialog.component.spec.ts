import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSearchDialogComponent } from './file-search-dialog.component';

describe('SearchDialogComponent', () => {
  let component: FileSearchDialogComponent;
  let fixture: ComponentFixture<FileSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSearchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
