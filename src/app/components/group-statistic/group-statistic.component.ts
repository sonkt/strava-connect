import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/services/base.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-statistic',
  templateUrl: './group-statistic.component.html',
  styleUrls: ['./group-statistic.component.scss']
})
export class GroupStatisticComponent implements OnInit {


  isSyncLoading = false;
  isLoading = false;
  activities: any[] = [];
  currentUserName = '';
  groupName = '';
  groupDesc = '';
  groupTargetType = 1;
  groupTartget = 25;
  from: number = 0;
  to: number = 0;

  constructor(private groupSv: GroupService, private baseSv: BaseService, private route: ActivatedRoute, private toastSv: ToastrService) { }

  async ngOnInit() {
    if (!this.baseSv.currentUser) {
      this.baseSv.redirectToLogin();
    }
    this.currentUserName = this.baseSv.currentUser?.userName ?? '';
    try {
      this.route.queryParams.subscribe(params => {
        const groupId = params['gid'];
        this.isLoading = true;
        this.groupSv.getActivities(groupId).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.activities = res.data.members;
            this.groupDesc = res.data.description;
            this.groupName = res.data.name;
            this.from = res.data.from;
            this.to = res.data.to;
            this.isLoading = false;
          }
          else if (res.statusCode == 207) {
            this.isLoading = false;
            this.toastSv.warning(res.messages);
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
      this.groupSv.sync().subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toastSv.success(res.messages)
          this.isSyncLoading = false;
          top?.location.reload();
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
