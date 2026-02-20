import { ɵnormalizeQueryParams } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const librarianGuard: CanActivateFn = (route, state) => {
  const role =localStorage.getItem('role')

  const router = inject(Router)
  if(role == "librarian"){
    return true
  }
  else{
    router.navigate(['/book/list']),
    {ɵnormalizeQueryParams:{returnurl:state.url}}
    return false
  }
};
