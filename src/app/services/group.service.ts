import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../data/http.response.model';
import { catchError, map } from 'rxjs/operators';
import { StatusCode } from '../enums/http.statuscode.enum';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient, private baseSv: BaseService) { }

  getActivities(groupId: string) {
    const url = `${environment.api.baseUrl}:${environment.api.basePort}/${environment.api.group.detail}/${groupId}`;
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

  getListGroups() {
    const url = `${environment.api.baseUrl}:${environment.api.basePort}/${environment.api.group.list}`;
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

  sync() {
    const url = `${environment.api.baseUrl}:${environment.api.basePort}/${environment.api.users.sync}`;
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



  register(groupId: string) {
    const user = this.baseSv.currentUser;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.accessToken}`,
    });
    if (user) {
      return this.http
        .post<APIResponse>(
          environment.api.baseUrl +
          ':' +
          environment.api.basePort +
          '/' +
          environment.api.group.register,
          {
            groupId: groupId
          },
          { headers }
        )
        .pipe(
          map(async (resData) => {
            if (resData.statusCode === StatusCode.OK) {
              return resData;
            }
            else {
              const errorMessage = resData.messages;
              throw new Error(errorMessage);
            }
          }),
          catchError(this.handleError)
        ).toPromise();
    }
    else {
      throw new Error('Vui lòng đăng nhập');
    }
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage: string = errorResponse.error.messages;
    return throwError(errorMessage);
  }


}
