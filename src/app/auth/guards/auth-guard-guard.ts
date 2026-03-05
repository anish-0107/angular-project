import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth-service';
import { ɵnormalizeQueryParams } from '@angular/common';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const authserv = inject(AuthService)
  const router = inject(Router)

  if(authserv.isLoggedIn()){
    console.log(authserv.isLoggedIn());
    return true
  }
    else{    
    return router.createUrlTree(['/auth/login'])  
    }

  
};
