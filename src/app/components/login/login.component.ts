import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isLoading = false;
  errorMessage: string | undefined;
  subscription: Subscription = new Subscription();
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

    this.subscription.add(
      await this.authService.login(username, password).then(
        (data) => {
          // top.location.href = MenuLinks.administration.dashboard;
        },
        (err) => {
          this.errorMessage = err.message;
          this.isLoading = false;
        }
      )
    );
  }
}
