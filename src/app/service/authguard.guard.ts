import { CanActivateFn, Router  } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authguardGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.registered()){
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
