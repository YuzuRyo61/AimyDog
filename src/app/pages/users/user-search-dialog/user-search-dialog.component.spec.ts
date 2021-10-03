import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchDialogComponent } from './user-search-dialog.component';

describe('SearchDialogComponent', () => {
  let component: UserSearchDialogComponent;
  let fixture: ComponentFixture<UserSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSearchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
