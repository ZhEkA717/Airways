import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDateComponent } from './one-date.component';

describe('OneDateComponent', () => {
  let component: OneDateComponent;
  let fixture: ComponentFixture<OneDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneDateComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(OneDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
