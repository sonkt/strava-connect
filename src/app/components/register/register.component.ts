import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  errorMessage: string | undefined;
  successMessage: string | undefined;
  subscription: Subscription = new Subscription();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  async onSubmit(form: NgForm) {
    this.errorMessage = '';
    if (!form.valid) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin';
      return;
    }
    this.isLoading = true;
    const username = form.value.username;
    const password = form.value.password;
    const repassword = form.value.repassword;
    const baCode = form.value.baCode;
    const fullName = form.value.fullName;

    this.subscription.add(
      await this.authService.register(username, password, repassword, baCode, fullName).then(
        (data) => {
          this.successMessage = 'Đăng ký thành công. Vui lòng click vào link Đăng nhập bên dưới để tiếp tục';
          this.isLoading = false;
        },
        (err) => {
          this.errorMessage = err.message ? err.message : err.messages ? err.messages : err;
          this.isLoading = false;
        }
      )
    );
  }
}
