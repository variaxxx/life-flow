import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, catchError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environments} from "../../environments/environments";
import {Router} from "@angular/router";

export interface LoginResponse {
  token: string;

}

export interface UserModel {
  username: string;
  email: string;
  number: string | null;
  password: string;
  avatarUrl: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isUserLoggedIn = new BehaviorSubject<boolean>(false);

  private httpClient = inject(HttpClient);
  private router = inject(Router);

  public registration(info: UserModel) {
    this.httpClient.post(`${environments.apiBaseUrl}/user/register`, info)
      .pipe(
        catchError(err => {
          throw new Error('Error while trying to register')
        })
      )
      .subscribe(value => {
        this._isUserLoggedIn.next(true);
        this.router.navigateByUrl('');
        console.log(value);
      })
  }

  public login(info: {username: string, password: string}): void {
    this.httpClient.post<LoginResponse>(`${environments.apiBaseUrl}/user/login`, info, {responseType: 'json'})
      .pipe(
        catchError(err => {
          throw new Error('Error while trying to log in')
        })
      )
      .subscribe(value => {
        this._isUserLoggedIn.next(true);
        this.router.navigateByUrl('');
        console.log('Successfully logged in');
      })
  }

  get isUserLoggedIn() {
    return this._isUserLoggedIn.value;
  }
}
