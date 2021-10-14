import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiEditDialogComponent } from './emoji-edit-dialog.component';

describe('EmojiEditDialogComponent', () => {
  let component: EmojiEditDialogComponent;
  let fixture: ComponentFixture<EmojiEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmojiEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
