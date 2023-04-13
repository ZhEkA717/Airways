import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPassengersComponent } from './select-passengers.component';

describe('SelectPassengersComponent', () => {
  let component: SelectPassengersComponent;
  let fixture: ComponentFixture<SelectPassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectPassengersComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
