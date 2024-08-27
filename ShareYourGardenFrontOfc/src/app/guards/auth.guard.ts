import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  let router = inject(Router);

  if((state.url != '/plants' && state.url != '/about' &&  state.url != '/login' &&  state.url != '/register') && !loginService.getToken()){
    router.navigate(['/login'])
    return false;
  }
  

  return true;
};
