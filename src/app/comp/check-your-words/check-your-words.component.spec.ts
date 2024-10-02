import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckYourWordsComponent } from './check-your-words.component';

describe('CheckYourWordsComponent', () => {
  let component: CheckYourWordsComponent;
  let fixture: ComponentFixture<CheckYourWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckYourWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckYourWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
