import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrvInfoCardComponent } from './srv-info-card.component';

describe('SrvInfoCardComponent', () => {
  let component: SrvInfoCardComponent;
  let fixture: ComponentFixture<SrvInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrvInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrvInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
