import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeTokenComponent } from './components/exchange-token/exchange-token.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EventComponent } from './components/event/event.component';
import { GroupComponent } from './components/group/group.component';
import { GroupStatisticComponent } from './components/group-statistic/group-statistic.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { GroupPersonalTargetComponent } from './components/group-personal-target/group-personal-target.component';

const routes: Routes = [
  {
    path: getRelativeRoute('/'),
    component: ProfileComponent
  },
  {
    path: getRelativeRoute('/nhom'),
    component: GroupComponent
  },
  {
    path: getRelativeRoute('/cap-nhat-muc-tieu'),
    component: GroupPersonalTargetComponent
  },
  {
    path: getRelativeRoute('/cap-nhat-profile'),
    component: UpdateProfileComponent
  },
  {
    path: getRelativeRoute('/thanh-tich-nhom'),
    component: GroupStatisticComponent
  },
  {
    path: getRelativeRoute('/exchange_token'),
    component: ExchangeTokenComponent
  },
  {
    path: getRelativeRoute('/thong-ke'),
    component: StatisticComponent
  },
  {
    path: getRelativeRoute('/su-kien'),
    component: EventComponent
  },
  {
    path: getRelativeRoute('/dang-nhap'),
    component: LoginComponent
  },
  {
    path: getRelativeRoute('/dang-ky'),
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export function getRelativeRoute(fullRoute: string, level = 1) {
  let url: string = '';
  if (fullRoute && fullRoute.trim().length > 0) {
    const list = fullRoute.split('/').filter(x => x).reverse();
    if (list.length > 0) {
      if (level <= list.length && level > 0) {
        url = list.slice(0, level).reverse().join('/');
      }
    }
  }

  return url;
}