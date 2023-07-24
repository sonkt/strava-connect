import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageName } from 'src/app/enums/local-storage-name.enum';
import { BaseService } from 'src/app/services/base.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  constructor(private baseSv: BaseService, private eventSv: EventService, private toastSv: ToastrService) { }
  listEvents: { id: string, name: string, from: number, to: number, description: string, status: number, registered: boolean }[] = [];
  isLoading = false;
  isRegLoading = false;
  eventIds!: string[];
  async ngOnInit() {
    if (!this.baseSv.currentUser) {
      this.baseSv.redirectToLogin();
    }
    this.eventIds = this.baseSv.currentUser?.eventIds ?? [];
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
          this.toastSv.success(res.messages)
          this.isRegLoading = false;
          var currentUser = this.baseSv.currentUser;
          currentUser?.eventIds.push(res.data.dataId);
          localStorage.setItem(LocalStorageName.CurrentUserData, JSON.stringify(currentUser));
          this.baseSv.redirectTo('/su-kien');
        }
      },
        (err) => {
          this.toastSv.warning(err.message);
          this.isRegLoading = false;
        });
    } catch (error) {
      this.toastSv.error('Có lỗi, vui lòng thử lại sau');
      this.isRegLoading = false;
    }
  }
}
