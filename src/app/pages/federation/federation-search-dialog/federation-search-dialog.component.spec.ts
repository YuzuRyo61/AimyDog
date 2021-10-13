import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationSearchDialogComponent } from './federation-search-dialog.component';

describe('FederationSearchDialogComponent', () => {
  let component: FederationSearchDialogComponent;
  let fixture: ComponentFixture<FederationSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FederationSearchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FederationSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
