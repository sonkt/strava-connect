import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/data/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private baseSv: BaseService, private userSv: AuthService) { }
  user: UserProfile | undefined;
  isLoading = false;
  isSyncLoading = false;
  strGetCodeUrl = `https://www.strava.com/oauth/authorize?client_id=110878&response_type=code&redirect_uri=${environment.redirectLink}/exchange_token&approval_prompt=force&scope=read_all,profile:read_all,activity:read_all`
  ngOnInit(): void {
    if (!this.baseSv.currentUser) {
      this.baseSv.redirectToLogin();
    }

    try {
      this.isLoading = true;
      this.userSv.getCurrentUserProfile().subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.user = res.data;
          this.isLoading = false;
        }
      });
    } catch (error) {
      this.isLoading = false;
    }
  }

}
