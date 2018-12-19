import { Injectable } from '@angular/core';
import {WSMain} from '../ws/WSMain';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends WSMain{

  constructor( private http: HttpClient,
              public jwtHelper: JwtHelperService) {
    super(http);
  }

  static getAuthorizationToken() {
    return localStorage.getItem('access_token');
  }
}
