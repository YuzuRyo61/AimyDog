import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YnDialogComponent } from './yn-dialog.component';

describe('YnDialogComponent', () => {
  let component: YnDialogComponent;
  let fixture: ComponentFixture<YnDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YnDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YnDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
