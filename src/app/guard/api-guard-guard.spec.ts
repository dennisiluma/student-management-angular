import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { apiGuardGuard } from './api-guard-guard';

describe('apiGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => apiGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
