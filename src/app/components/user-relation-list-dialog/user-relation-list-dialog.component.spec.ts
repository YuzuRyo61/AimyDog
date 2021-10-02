import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRelationListDialogComponent } from './user-relation-list-dialog.component';

describe('UserRelationListDialogComponent', () => {
  let component: UserRelationListDialogComponent;
  let fixture: ComponentFixture<UserRelationListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRelationListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRelationListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
