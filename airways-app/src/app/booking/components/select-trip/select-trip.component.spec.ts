import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTripComponent } from './select-trip.component';

describe('SelectTripComponent', () => {
  let component: SelectTripComponent;
  let fixture: ComponentFixture<SelectTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
