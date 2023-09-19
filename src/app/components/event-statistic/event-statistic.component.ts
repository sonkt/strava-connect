import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/services/base.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-statistic',
  templateUrl: './event-statistic.component.html',
  styleUrls: ['./event-statistic.component.scss']
})
export class EventStatisticComponent implements OnInit {

  toastOptions = { positionClass: 'toast-custom' };
  isSyncLoading = false;
  isLoading = false;
  activities: any[] = [];
  currentUserName = '';
  eventId = '';
  eventName = '';
  eventDesc = '';
  from: number = 0;
  to: number = 0;


  constructor(private eventSv: EventService, private baseSv: BaseService, private route: ActivatedRoute, private toastSv: ToastrService) { }

  ngOnInit(): void {
    if (!this.baseSv.currentUser) {
      this.baseSv.redirectToLogin();
    }
    this.currentUserName = this.baseSv.currentUser?.userName ?? '';
    try {
      this.route.queryParams.subscribe(params => {
        const eventId = params['eid'];
        this.isLoading = true;
        this.eventSv.getActivities(eventId).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.activities = res.data.members;
            this.eventDesc = res.data.description;
            this.eventName = res.data.name;
            this.eventId = res.data.id;
            this.from = res.data.from;
            this.to = res.data.to;
            this.isLoading = false;
          }
          else if (res.statusCode == 207) {
            this.isLoading = false;
            this.toastSv.warning(res.messages, 'Thông báo', this.toastOptions);
          }
        });
      });
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
          this.toastSv.success(res.messages, 'Thông báo', this.toastOptions)
          this.isSyncLoading = false;
          top?.location.reload();
        }
        else {
          this.toastSv.warning(res.messages, 'Thông báo', this.toastOptions);
          this.isSyncLoading = false;
        }
      },
        (err) => {
          this.toastSv.warning(err.message, 'Thông báo', this.toastOptions);
          this.isSyncLoading = false;
        });
    } catch (error) {
      this.toastSv.error('Có lỗi, vui lòng thử lại sau', 'Thông báo', this.toastOptions);
      this.isSyncLoading = false;
    }
  }
}
