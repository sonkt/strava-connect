import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { APIResponse } from '../data/http.response.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { StatusCode } from '../enums/http.statuscode.enum';
import { throwError } from 'rxjs/internal/observable/throwError';
import { LocalStorageName } from '../enums/local-storage-name.enum';
import { catchError, take } from 'rxjs/operators';
import { UserLogin, UserProfile } from '../data/user.model';
import { LoginStatus } from '../enums/login-status.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenExpirationTimer: any;
  constructor(private http: HttpClient, private baseSv: BaseService) { }

  login(email: string, password: string) {
    return this.http
      .post<APIResponse>(
        environment.api.baseUrl +
        ':' +
        environment.api.basePort +
        '/' +
        environment.api.authentication.login,
        {
          UserName: email,
          Password: password
        }
      )
      .pipe(
        map(async (resData) => {
          if (resData.statusCode === StatusCode.OK) {
            const user: UserLogin = new UserLogin().parseLoginData(resData.data);
            if (user.status === LoginStatus.Success) {
              localStorage.setItem(LocalStorageName.CurrentUserData, JSON.stringify(user));
              window.location.href = '/';
            }
            else {
              const errorMessage = resData.messages;
              throw new Error(errorMessage);
            }
          }
          else {
            const errorMessage = resData.messages;
            throw new Error(errorMessage);
          }
        }),
        catchError(this.handleError)
      ).toPromise();
  }


  register(email: string, password: string, repassword: string, baCode: string, fullName: string) {
    return this.http
      .post<APIResponse>(
        environment.api.baseUrl +
        ':' +
        environment.api.basePort +
        '/' +
        environment.api.authentication.register,
        {
          UserName: email,
          Password: password,
          RePassword: repassword,
          BaCode: baCode,
          FullName: fullName
        }
      )
      .pipe(
        map(async (resData) => {
          if (resData.statusCode === StatusCode.OK) {
            const user: UserLogin = new UserLogin().parseLoginData(resData.data);
            if (user.status === LoginStatus.Success) {

            }
            else {
              const errorMessage = resData.messages;
              throw new Error(errorMessage);
            }
          }
          else {
            const errorMessage = resData.messages;
            throw new Error(errorMessage);
          }
        }),
        catchError(this.handleError)
      ).toPromise();
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage: string = errorResponse?.error?.messages ? errorResponse.error.messages : errorResponse?.error?.message;
    return throwError(errorMessage);
  }

  logout() {
    // Logout API
    if (!this.baseSv.isNoAuthPage) {
      this.removeUserInfo();
      window.location.href = '/dang-nhap';
    }
  }

  removeUserInfo() {
    // Xóa và logout trên client
    localStorage.removeItem(LocalStorageName.CurrentUserData);
  }


  getCurrentUserProfile() {
    const url = `${environment.api.baseUrl}:${environment.api.basePort}/${environment.api.users.profile}`;
    const user = this.baseSv.currentUser;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.accessToken}`,
    });
    if (user) {
      return this.http
        .get(url, { headers });
    }
    else {
      throw new Error('Vui lòng đăng nhập');
    }
  }



  update_profile(profile: UserProfile) {
    const user = this.baseSv.currentUser;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.accessToken}`,
    });
    return this.http
      .put<APIResponse>(
        environment.api.baseUrl +
        ':' +
        environment.api.basePort +
        '/' +
        environment.api.users.profile,
        profile,
        { headers }
      )
      .pipe(
        map(async (resData) => {
          if (resData.statusCode === StatusCode.OK) {

          }
          else {
            const errorMessage = resData.messages;
            throw new Error(errorMessage);
          }
        }),
        catchError(this.handleError)
      ).toPromise();
  }

}
