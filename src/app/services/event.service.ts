import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { APIResponse } from '../data/http.response.model';
import { map } from 'rxjs/internal/operators/map';
import { StatusCode } from '../enums/http.statuscode.enum';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private baseSv: BaseService) { }

  getCurrentEvent() {
    const url = `${environment.api.baseUrl}:${environment.api.basePort}/${environment.api.event.current}`;
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

  getActivities(eventId: string) {
    const url = `${environment.api.baseUrl}:${environment.api.basePort}/${environment.api.event.detail}/${eventId}`;
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
  getListEvent() {
    const url = `${environment.api.baseUrl}:${environment.api.basePort}/${environment.api.event.list}`;
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



  register(eventId: string) {
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
          environment.api.event.register,
          {
            eventId: eventId
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
