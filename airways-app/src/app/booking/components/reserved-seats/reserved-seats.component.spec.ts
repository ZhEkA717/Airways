import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedSeatsComponent } from './reserved-seats.component';

describe('ReservedSeatsComponent', () => {
  let component: ReservedSeatsComponent;
  let fixture: ComponentFixture<ReservedSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservedSeatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
