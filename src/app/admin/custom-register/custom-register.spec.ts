import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRegister } from './custom-register';

describe('CustomRegister', () => {
  let component: CustomRegister;
  let fixture: ComponentFixture<CustomRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomRegister],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
