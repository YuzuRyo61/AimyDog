import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModLogCardComponent } from './mod-log-card.component';

describe('ModLogCardComponent', () => {
  let component: ModLogCardComponent;
  let fixture: ComponentFixture<ModLogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModLogCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModLogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
