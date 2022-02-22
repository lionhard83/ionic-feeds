import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export type Auth = {
  nickname: string;
  password: string;
  phone: string;
};

export type Token = {
  accessToken: string;
  grantType: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signin(auth: Auth) {
    return this.httpClient
      .post<void>(`${environment.host}/signin`, auth)
      .toPromise();
  }

  login(auth: Omit<Auth, 'phone'>) {
    return this.httpClient
      .post<Token>(`${environment.host}/login`, auth)
      .toPromise();
  }
}
