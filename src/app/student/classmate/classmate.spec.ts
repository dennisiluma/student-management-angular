import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Classmate } from './classmate';

describe('Classmate', () => {
  let component: Classmate;
  let fixture: ComponentFixture<Classmate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Classmate],
    }).compileComponents();

    fixture = TestBed.createComponent(Classmate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
