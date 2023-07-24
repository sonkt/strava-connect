import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private baseSv: BaseService, private auth: AuthService) { }
  loggedIn = false;
  actived = false;
  activeLink = '';
  userName = '';
  ngOnInit(): void {
    this.activeLink = `https://www.strava.com/oauth/authorize?client_id=110878&response_type=code&redirect_uri=${environment.redirectLink}/exchange_token&approval_prompt=force&scope=read_all,profile:read_all,activity:read_all`
    if (this.baseSv.currentUser) {
      this.loggedIn = true;
      this.userName = this.baseSv.currentUser.userName;
      if (this.baseSv.currentUser.userStatus == 2) {
        this.actived = true;
      }
    }
  }
  logOut() {
    this.auth.removeUserInfo();
    this.baseSv.redirectToLogin();
  }
}
