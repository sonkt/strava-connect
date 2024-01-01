import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { ExchangeTokenComponent } from './components/exchange-token/exchange-token.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PasswordValidateDirective } from './directive/password.directive';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { EventComponent } from './components/event/event.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupComponent } from './components/group/group.component';
import { GroupStatisticComponent } from './components/group-statistic/group-statistic.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { GroupPersonalTargetComponent } from './components/group-personal-target/group-personal-target.component';
import { EventStatisticComponent } from './components/event-statistic/event-statistic.component';
import { UsernameValidateDirective } from './directive/username-validate.directive';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeTokenComponent,
    StatisticComponent,
    LoginComponent,
    RegisterComponent,
    LoadingComponent,
    PasswordValidateDirective,
    UsernameValidateDirective,
    ProfileComponent,
    FooterComponent,
    HeaderComponent,
    EventComponent,
    GroupComponent,
    GroupStatisticComponent,
    UpdateProfileComponent,
    GroupPersonalTargetComponent,
    EventStatisticComponent
  ],
  imports: [
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'increasing',
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    UsernameValidateDirective,
    PasswordValidateDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
