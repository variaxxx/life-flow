import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(UserService).isUserLoggedIn;

  if (isLoggedIn) return true;

  return inject(Router).navigateByUrl('');
};
