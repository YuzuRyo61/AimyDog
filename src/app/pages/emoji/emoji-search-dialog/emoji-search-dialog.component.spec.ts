import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiSearchDialogComponent } from './emoji-search-dialog.component';

describe('EmojiSearchDialogComponent', () => {
  let component: EmojiSearchDialogComponent;
  let fixture: ComponentFixture<EmojiSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmojiSearchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
