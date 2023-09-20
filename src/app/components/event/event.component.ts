import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/services/base.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  toastOptions = { positionClass: 'toast-custom' };
  constructor(private baseSv: BaseService, private eventSv: EventService, private toastSv: ToastrService) { }
  listEvents: { id: string, name: string, from: number, to: number, description: string, isLocked: number, registered: boolean }[] = [];
  isLoading = false;
  isRegLoading = false;
  eventIds!: string[];
  async ngOnInit() {
    if (!this.baseSv.currentUser) {
      this.baseSv.redirectToLogin();
    }
    this.eventIds = this.baseSv.currentUser?.groupIds ?? [];
    try {
      this.isLoading = true;
      this.eventSv.getListEvent().subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.listEvents = res.data;
          this.isLoading = false;
        }
      });
    } catch (error) {
      this.isLoading = false;
    }
  }
  register(id: string) {

    if (!this.baseSv.currentUser) {
      this.baseSv.redirectToLogin();
    }

    try {
      this.isRegLoading = true;
      this.eventSv.register(id).then((res: any) => {
        if (res.statusCode == 200) {
          this.toastSv.success(res.messages, 'Thông báo', this.toastOptions)
          this.isRegLoading = false;
          this.baseSv.redirectTo('/su-kien');
        }
      },
        (err) => {
          this.toastSv.warning(err.message, 'Thông báo', this.toastOptions);
          this.isRegLoading = false;
        });
    } catch (error) {
      this.toastSv.error('Có lỗi, vui lòng thử lại sau', 'Thông báo', this.toastOptions);
      this.isRegLoading = false;
    }
  }
}
