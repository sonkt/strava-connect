import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/services/base.service';
import { EventService } from 'src/app/services/event.service';
import { StravaService } from 'src/app/services/strava-service.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  athletes: any[] = [];
  isLoading = false;
  currentUserName = '';
  currentEventName = '';
  isSyncLoading = false;
  from: any;
  to: any;
  constructor(private strService: StravaService, private eventSv: EventService, private baseSv: BaseService, private toastSv: ToastrService) { }

  async ngOnInit() {
    if (!this.baseSv.currentUser) {
      this.baseSv.redirectToLogin();
    }
    this.currentUserName = this.baseSv.currentUser?.userName ?? '';
    try {
      this.isLoading = true;
      this.strService.getActivitiesOfMember().subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.athletes = res.data;
          this.isLoading = false;
        }
      });
      this.eventSv.getCurrentEvent().subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.currentEventName = res.data.name;
          this.from = new Date(res.data.from * 1000);
          this.to = new Date(res.data.to * 1000);
        }
      }
      );
    } catch (error) {
      this.isLoading = false;
    }
  }

  sync() {
    if (!this.baseSv.currentUser) {
      this.baseSv.redirectToLogin();
    }

    try {
      this.isSyncLoading = true;
      this.eventSv.sync().subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toastSv.success(res.messages)
          this.isSyncLoading = false;
          this.baseSv.redirectTo('/thong-ke');
        }
        else {
          this.toastSv.warning(res.messages);
          this.isSyncLoading = false;
        }
      },
        (err) => {
          this.toastSv.warning(err.message);
          this.isSyncLoading = false;
        });
    } catch (error) {
      this.toastSv.error('Có lỗi, vui lòng thử lại sau');
      this.isSyncLoading = false;
    }
  }

}
