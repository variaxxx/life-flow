import {APP_INITIALIZER, inject, Injectable, makeEnvironmentProviders} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {catchError, of, tap, zip} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface IconsConfig<T = readonly string[]> {
  assetsPath: string,
  icons: T
}

export const provideIcons = (config: IconsConfig) => {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [IconService],
      useFactory: (iconsService: IconService) => {
        return () => {
          return iconsService.initIcons(config);
        }
      }
    }
  ])
}

@Injectable({
  providedIn: 'root'
})
export class IconService {

  dom: DomSanitizer = inject(DomSanitizer);
  http: HttpClient = inject(HttpClient);

  private iconsConfig!: IconsConfig;

  private record: Record<string, SafeHtml> = {};

  private registerAll(icons: readonly string[]) {
    return icons.map((icon: string) => this.registerFromAssets(icon));
  }

  private registerFromAssets(icon: string) {
    return this.http.get(`${this.iconsConfig.assetsPath}/${icon}.svg`, {responseType: 'text'}).pipe(
      tap(svg => {
        if (typeof window !== 'undefined' && typeof DOMParser !== 'undefined') {
          const parser = new DOMParser();
          const doc = parser.parseFromString(svg, 'image/svg+xml');

          const elements = doc.querySelectorAll('*');
          elements?.forEach(element => {
            element.removeAttribute('stroke');
            element.removeAttribute('fill');
            element.removeAttribute('height');
            element.removeAttribute('width');
          })

          const serializer = new XMLSerializer();
          const modifiedSvg = serializer.serializeToString(doc.documentElement);

          this.record[icon] = this.dom.bypassSecurityTrustHtml(modifiedSvg);
        }
      }),
      catchError(err => {
        console.error(`Error loading icon ${icon}:`, err);
        return of(undefined);
      })
    )
  }

  get(icon: string): SafeHtml {
    return this.record[icon];
  }

  initIcons(config: IconsConfig) {
    this.iconsConfig = config;
    return zip(
      ...this.registerAll(config.icons)
    ).pipe(
      tap(() => console.log('Icons initialized'))
    )
  }
}
