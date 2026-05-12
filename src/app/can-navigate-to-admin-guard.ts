import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Authentication} from './shared/authentication';
import {ToastrService} from 'ngx-toastr';

export const canNavigateToAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Authentication);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if(authService.isLoggedIn()){
    return true;
  } else {
    toastr.error('You are not allowed to enter this route. Please log in first.');
    router.navigateByUrl('/login');
    return false;
  }
};
