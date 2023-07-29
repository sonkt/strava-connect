import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserProfile } from 'src/app/data/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  toastOptions = { positionClass: 'toast-custom' };
  isLoading = false;
  isInitLoading = false;
  errorMessage: string | undefined;
  successMessage: string | undefined;
  subscription: Subscription = new Subscription();
  profile: UserProfile = new UserProfile();
  constructor(private userSv: AuthService, private baseSv: BaseService, private toastSv: ToastrService) { }

  ngOnInit(): void {
    if (!this.baseSv.currentUser) {
      this.baseSv.redirectToLogin();
    }

    try {
      this.isInitLoading = true;
      this.userSv.getCurrentUserProfile().subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.profile = res.data;
          this.isInitLoading = false;
        }
      });
    } catch (error) {
      this.isInitLoading = false;
    }
  }
  async onSubmit(form: NgForm) {
    this.errorMessage = '';
    if (!form.valid) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin';
      return;
    }
    form.value.avatar = this.profile.avatar;
    this.isLoading = true;
    this.subscription.add(
      await this.userSv.update_profile(form.value).then(
        (data) => {
          this.toastSv.success('Cập nhật thành công. Vui lòng Đăng nhập lại.', 'Thông báo', this.toastOptions);
          this.isLoading = false;
        },
        (err) => {
          this.errorMessage = err.message ? err.message : err.messages ? err.messages : err;
          this.isLoading = false;
        }
      )
    );
  }
  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      return;
    }
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.toastSv.warning("Định dạng file không hỗ trợ", 'Thông báo', this.toastOptions);
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.profile.avatar = reader.result as string;
    }
  }
}
