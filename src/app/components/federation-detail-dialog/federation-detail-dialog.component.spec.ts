import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationDetailDialogComponent } from './federation-detail-dialog.component';

describe('FederationDetailDialogComponent', () => {
  let component: FederationDetailDialogComponent;
  let fixture: ComponentFixture<FederationDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FederationDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FederationDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
