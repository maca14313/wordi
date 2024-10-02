import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToGroupOfWordsComponent } from './to-group-of-words.component';

describe('ToGroupOfWordsComponent', () => {
  let component: ToGroupOfWordsComponent;
  let fixture: ComponentFixture<ToGroupOfWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToGroupOfWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToGroupOfWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
