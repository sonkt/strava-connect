import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/services/base.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  toastOptions = { positionClass: 'toast-custom' };
  constructor(private baseSv: BaseService, private groupSv: GroupService, private toastSv: ToastrService) { }
  listGroups: { id: string, name: string, target: number, targetType: number, description: string, registered: boolean, isLockRegistered: boolean }[] = [];
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
      this.groupSv.getListGroups().subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.listGroups = res.data;
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
      this.groupSv.register(id).then((res: any) => {
        if (res.statusCode == 200) {
          this.toastSv.success(res.messages, 'Thông báo', this.toastOptions)
          this.isRegLoading = false;
          this.baseSv.redirectTo('/nhom');
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
