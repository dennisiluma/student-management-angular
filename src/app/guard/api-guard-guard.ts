import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Api } from '../services/api';



export const apiGuardGuard: CanActivateFn = (route, state) => {

  const api = inject(Api)
  const router = inject(Router)


  const isAuth = api.isAuthenticated();
  const userRole = api.getUserRole();
  const allowedRoles = route.data?.['allowedRoles'] as string[] | undefined;

  // 1. Unauthenticated -> Redirect to /login
  if (!isAuth) {
    return router.createUrlTree(['/login']);
  }

  // 2. Role-based check (if allowedRoles are specified)
  if (allowedRoles && allowedRoles.length > 0) {
    if (!userRole || !allowedRoles.includes(userRole.toLowerCase())) {
      return router.createUrlTree(['/login']);
    }
  }

  // 3. Authorized -> Allow activation
  return true;
};
