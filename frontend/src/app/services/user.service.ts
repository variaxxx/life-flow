import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environments} from "../../environments/environments";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface UserModel {
  username: string;
  email: string;
  number: string | null;
  password: string;
  avatarUrl: string | null;
}

export interface LoginForm {
  username?: string | null;
  password?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public token: string | null = null;
  public refreshToken: string | null = null;

  private httpClient = inject(HttpClient);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  public registration(info: UserModel) {
    this.httpClient.post(`${environments.apiBaseUrl}/user/register`, info)
      .pipe(
        catchError(err => {
          throw new Error('Error while trying to register')
        })
      )
      .subscribe(value => {
        console.log(value);
      })

    // TODO: refactor registration
  }

  public login(payload: LoginForm) {
    const fd = new FormData();
    fd.append("username", payload.username!);
    fd.append("password", payload.password!);

    return this.httpClient.post<TokenResponse>(`${environments.apiBaseUrl}/auth/token`, fd)
      .pipe(
        tap(value => this.saveTokens(value)),
        catchError(err => {
          throw new Error('Error while trying to log in')
        })
      )
  }

  public refreshAuthToken() {
    return this.httpClient.post<TokenResponse>(
      `${environments.apiBaseUrl}/auth/refresh`,
      {
        refresh_token: this.refreshToken
      }
      )
      .pipe(
        tap(value => this.saveTokens(value)),
        catchError(err => {
          this.logout();
          return throwError(err);
        })
      )
  }

  public logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigateByUrl('/account/login')
  }

  private saveTokens(value: TokenResponse) {
    this.token = value.access_token;
    this.refreshToken = value.refresh_token;

    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refreshToken);
  }

  get isUserLoggedIn() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken')
    }

    return !!this.token;
  }
}
