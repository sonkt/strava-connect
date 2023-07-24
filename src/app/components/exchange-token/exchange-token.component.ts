import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusCode } from 'src/app/enums/http.statuscode.enum';
import { AuthService } from 'src/app/services/auth.service';
import { BaseService } from 'src/app/services/base.service';
import { StravaService } from 'src/app/services/strava-service.service';

@Component({
  selector: 'app-exchange-token',
  templateUrl: './exchange-token.component.html',
  styleUrls: ['./exchange-token.component.scss']
})
export class ExchangeTokenComponent implements OnInit {

  constructor(private route: ActivatedRoute, private stravaSv: StravaService, private baseSv: BaseService, private auth: AuthService) { }
  errorMessage: string | undefined;
  successMessage: string | undefined;
  isLoading = false;
  ngOnInit(): void {
    this.isLoading = true;
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.stravaSv.activeStrava(params.code).subscribe((res) => {
          if (res.statusCode == StatusCode.OK) {
            this.isLoading = false;
            this.successMessage = 'Xác thực thành công. Hệ thống sẽ tự chuyển bạn đến trang đăng nhập sau 5 giây';
            setTimeout(() => {
              this.auth.removeUserInfo();
              this.baseSv.redirectTo('/dang-nhap');
            }, 5000);
          }
          else {
            this.errorMessage = res.messages;
            this.isLoading = false;
          }
        },
          (err) => {
            this.errorMessage = err.message ? err.message : err.messages ? err.messages : err;
            this.isLoading = false;
          });
      }
      );
  }

}
