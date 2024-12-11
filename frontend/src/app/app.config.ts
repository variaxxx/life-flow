import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {IconsConfig, provideIcons} from "../ui-kit/components/icon/services/icon.service";
import {icons} from "./app.icons";
import {provideSocials, SocialsConfig} from "../ui-kit/components/socials-icon/socials-icon.component";
import {NavigationConfig, provideNavigationRoutes} from "./services/navigation.service";
import {authTokenInterceptor} from "./interceptors/auth.interceptor";

export const headerConfig: NavigationConfig = {
  auth: [
    {
      text: 'Главная',
      url: '/'
    },
    {
      text: 'Авторизован',
      url: '/'
    }
  ],
  unauth: [
    {
      text: 'Главная',
      url: '/'
    },
    {
      text: 'Не авторизован',
      url: '/'
    }
  ]
};

export const socialsProps: SocialsConfig = {
  props: {
    tg: {
      color: '#0088CC',
      url: 'https://google.com/',
      icon: {
        name: 'tg',
        filled: true
      }
    },
    vk: {
      color: '#0077FF',
      url: 'https://vk.com/',
      icon: {
        name: 'vk',
        filled: true
      }
    }
  },
  defaultColor: 'var(--black-700)'
};

export const iconsConfig: IconsConfig = {
  assetsPath: '/assets/icons',
  icons: icons
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    provideIcons(iconsConfig),
    provideSocials(socialsProps),
    provideNavigationRoutes(headerConfig)
  ]
};
