import { Component } from '@angular/core';
import { LocalStorageName } from './enums/local-storage-name.enum';
import { BaseService } from './services/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isNoAuthPage = false;
  constructor(private baseSv: BaseService) {
  }

  ngOnInit() {
    this.isNoAuthPage = this.baseSv.isNoAuthPage = (window.location.href.toLowerCase().includes('dang-nhap') || window.location.href.toLowerCase().includes('dang-ky'));
    const authenticated = localStorage.getItem(LocalStorageName.CurrentUserData);
    if (!authenticated) {
      this.baseSv.redirectToLogin();
    }
  }
}
