import {inject, Injectable, InjectionToken, Provider} from '@angular/core';
import {UserService} from "./user.service";

export interface NavigationRoute {
  text: string,
  url: string
}

export interface NavigationConfig {
  auth: NavigationRoute[],
  unauth: NavigationRoute[]
}

export const NAVIGATION_ROUTES = new InjectionToken<NavigationConfig>('NAVIGATION_ROUTES');

export const provideNavigationRoutes = (config: NavigationConfig): Provider => ({
  provide: NAVIGATION_ROUTES,
  useValue: config
})

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private userService = inject(UserService);
  private headerRoutes = inject(NAVIGATION_ROUTES);

  public getRoutes() {
    if (this.userService.isUserLoggedIn) {
      return this.headerRoutes.auth;
    }
    return this.headerRoutes.unauth;
  }
}
