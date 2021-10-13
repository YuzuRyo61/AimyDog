import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationCardComponent } from './federation-card.component';

describe('FederationCardComponent', () => {
  let component: FederationCardComponent;
  let fixture: ComponentFixture<FederationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FederationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FederationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
