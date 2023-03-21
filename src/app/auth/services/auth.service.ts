import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, tap, of, map } from 'rxjs';
import { User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _userAuth: User | undefined;

  get userAuth(): User {
    return { ...this._userAuth! }
  }
  constructor(
    private http: HttpClient,
  ) { }

  login(): Observable<User> {
    return this.http.get<User>(`${this._baseUrl}/users/1`)
      .pipe(
        tap(userAuth => this._userAuth = userAuth),
        tap(userAuth => localStorage.setItem('token', userAuth.id))
      );
  }

  verifyAuthenthication(): Observable<boolean> {
    if (localStorage.getItem('toke')) {
      return of(false);
    }
    return this.http.get<User>(`${this._baseUrl} /users/1`)
      .pipe(map(auth => true));
  }
}
