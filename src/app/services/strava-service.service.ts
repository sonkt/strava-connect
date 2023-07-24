import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../data/http.response.model';

@Injectable({
  providedIn: 'root'
})
export class StravaService {

  constructor(private http: HttpClient, private baseSv: BaseService) { }

  getActivitiesOfMember() {
    const url = `${environment.api.baseUrl}:${environment.api.basePort}/${environment.api.users.all}`;
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

  activeStrava(accessCode: string | undefined) {
    const url = `${environment.api.baseUrl}:${environment.api.basePort}/${environment.api.users.active}`;
    const user = this.baseSv.currentUser;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.accessToken}`,
    });
    if (user && accessCode) {
      return this.http
        .post<APIResponse>(url, {
          acessCode: accessCode
        }, { headers });
    }
    else {
      throw new Error('Vui lòng đăng nhập');
    }
  }
}
