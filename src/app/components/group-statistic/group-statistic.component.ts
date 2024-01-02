import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/services/base.service';
import { GroupService } from 'src/app/services/group.service';
import * as moment from 'moment';

@Component({
  selector: 'app-group-statistic',
  templateUrl: './group-statistic.component.html',
  styleUrls: ['./group-statistic.component.scss']
})
export class GroupStatisticComponent implements OnInit {


  toastOptions = { positionClass: 'toast-custom' };
  isSyncLoading = false;
  isLoading = false;
  activities: any[] = [];
  currentUserName = '';
  groupId = '';
  groupName = '';
  groupDesc = '';
  groupTargetType = 1;
  groupTartget = 25;
  minLongRun = 15000;
  from: number = 0;
  to: number = 0;
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years: number[] = [];
  currentMonth!: number;
  currentYear!: number;
  fromMonth!: number;
  fromYear!: number;
  endOfWeek!: string;
  weekDatas: { endDate: string, startDate: string, label: string, isCurrent: boolean }[] = [];

  constructor(private groupSv: GroupService, private baseSv: BaseService, private route: ActivatedRoute, private toastSv: ToastrService) { }

  async ngOnInit() {
    var today = new Date();
    this.currentMonth = today.getMonth() + 1;
    this.currentYear = today.getFullYear();
    this.fromMonth = this.currentMonth;
    this.fromYear = this.currentYear;
    let startOfYear = this.currentYear - 3;
    if (startOfYear < 2023) {
      startOfYear = 2023
    }
    for (let index = startOfYear; index <= this.currentYear; index++) {
      this.years.push(index);
    }
    this.weekDatas = this.formatDates(this.currentYear);
    this.endOfWeek = `${this.weekDatas.find(m => m.isCurrent === true)?.endDate}`;
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
            this.minLongRun = res.data.minLongRunDistance;
            this.groupDesc = res.data.description;
            this.groupName = res.data.name;
            this.groupId = res.data.id;
            this.groupTargetType = res.data.targetType;
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
  filter() {
    var year = this.fromYear;
    var month = this.fromMonth;
    try {
      this.route.queryParams.subscribe(params => {
        const groupId = params['gid'];
        this.isLoading = true;
        if (this.groupTargetType == 2) {
          this.groupSv.getActivities(groupId, month, year).subscribe((res: any) => {
            if (res.statusCode == 200) {
              this.activities = res.data.members;
              this.minLongRun = res.data.minLongRunDistance;
              this.groupDesc = res.data.description;
              this.groupName = res.data.name;
              this.groupId = res.data.id;
              this.groupTargetType = res.data.targetType;
              this.from = res.data.from;
              this.to = res.data.to;
              this.isLoading = false;
            }
            else if (res.statusCode == 207) {
              this.isLoading = false;
              this.toastSv.warning(res.messages, 'Thông báo', this.toastOptions);
            }
          });
        }
        else {
          this.groupSv.getActivitiesByWeek(groupId, `${this.fromYear}-${this.endOfWeek}`).subscribe((res: any) => {
            if (res.statusCode == 200) {
              this.activities = res.data.members;
              this.minLongRun = res.data.minLongRunDistance;
              this.groupDesc = res.data.description;
              this.groupName = res.data.name;
              this.groupId = res.data.id;
              this.groupTargetType = res.data.targetType;
              this.from = res.data.from;
              this.to = res.data.to;
              this.isLoading = false;
            }
            else if (res.statusCode == 207) {
              this.isLoading = false;
              this.toastSv.warning(res.messages, 'Thông báo', this.toastOptions);
            }
          });
        }
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
  formatDates(year: number) {
    let startDate = moment(this.getMonday(`${year}-01-01`));
    let endDate = moment(`${year}-12-31`);
    let weekData: { endDate: string, startDate: string, label: string, isCurrent: boolean }[] = [];
    var today = moment();
    while (startDate.isSameOrBefore(endDate)) {
      if (weekData.length > 0) {
        // Update end date
        let lastObj = weekData[weekData.length - 1];
        lastObj['endDate'] = moment(startDate).format('MM-DD');
        lastObj['label'] = `${lastObj.startDate} (Tuần ${weekData.length})`;
        startDate.add(1, 'days');
      }
      var isCurrent = today.isSameOrAfter(startDate) && today.isSameOrBefore(endDate);
      weekData.push({ startDate: moment(startDate).format('DD/MM'), endDate: '', label: '', isCurrent: isCurrent });
      startDate.add(6, 'days');
    }
    if (startDate.isAfter(endDate)) {
      // Update last object
      let lastObj = weekData[weekData.length - 1];
      lastObj['endDate'] = moment(endDate).format('MM-DD');
      lastObj['label'] = `${lastObj.startDate} (Tuần ${weekData.length})`;
      lastObj['isCurrent'] = today.isSameOrAfter(startDate) && today.isSameOrBefore(endDate);
    }
    return weekData;
  }
  changeWeek() {
    this.weekDatas = this.formatDates(this.fromYear);
    this.endOfWeek = `${this.weekDatas.find(m => m.isCurrent === true)?.endDate}`;
  }
  getMonday(date: string) {
    var d = new Date(date);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
}
