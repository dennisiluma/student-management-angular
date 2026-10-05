import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReports } from './create-reports';

describe('CreateReports', () => {
  let component: CreateReports;
  let fixture: ComponentFixture<CreateReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateReports],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateReports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
