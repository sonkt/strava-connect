import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../data/user.model';
import { LocalStorageName } from '../enums/local-storage-name.enum';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  isNoAuthPage = false;
  currentUser: UserLogin | undefined;
  constructor(
    private router: Router
  ) {
    const currentUser = localStorage.getItem(LocalStorageName.CurrentUserData)
    this.currentUser = currentUser ? JSON.parse(currentUser) : null;
  }
  redirectToLogin() {
    if (!this.isNoAuthPage) {
      window.location.href = '/dang-nhap';
    }
  }
  redirectTo(url: string, skipLocationChange = false) {
    this.router.navigateByUrl(url, { skipLocationChange });
  }
  convertNumberToMinute(minute: number, showSeconds?: boolean) {
    if (this != null) {
      const hours = (minute / 60);
      const rhours = Math.floor(hours);
      const minutes = minute % 60;
      const rminutes = Math.floor(minutes);
      const seconds = (minutes - rminutes) * 60;
      const rseconds = Math.round(seconds);

      return (rhours < 10 ? '0' + rhours : rhours) + ':' + (rminutes < 10 ? '0' + rminutes : rminutes) + (showSeconds ? (':' + (rseconds < 10 ? '0' + rseconds : rseconds)) : '');
    }
    else {
      return null;
    }
  }
}
