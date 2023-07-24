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

}
