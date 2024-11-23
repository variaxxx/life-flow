import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const isLoggedGuard: CanActivateFn = (route, state) => {
  return inject(UserService).isUserLoggedIn;
};
