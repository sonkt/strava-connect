import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import { GroupResultModel } from 'src/app/data/group.model';
import { BaseService } from 'src/app/services/base.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-personal-target',
  templateUrl: './group-personal-target.component.html',
  styleUrls: ['./group-personal-target.component.scss']
})
export class GroupPersonalTargetComponent implements OnInit {

  toastOptions = { positionClass: 'toast-custom' };
  isLoading = false;
  isInitLoading = false;
  errorMessage: string | undefined;
  successMessage: string | undefined;
  subscription: Subscription = new Subscription();
  groupResult: GroupResultModel = new GroupResultModel();
  constructor(private baseSv: BaseService, private groupSv: GroupService, private toastSv: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.baseSv.currentUser) {
      this.baseSv.redirectToLogin();
    }
    try {
      this.route.queryParams.subscribe(params => {
        const groupId = params['gid'];
        this.isLoading = true;
        this.groupSv.getGroupResult(groupId).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.groupResult.groupName = res.data.name;
            this.groupResult.target = res.data.target;
            this.groupResult.targetType = res.data.targetType;
            this.groupResult.id = res.data.id;
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

  async onSubmit(form: NgForm) {
    this.errorMessage = '';
    if (!form.valid) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin';
      return;
    }
    this.isLoading = true;
    this.subscription.add(
      await this.groupSv.update_target(form.value).then(
        () => {
          this.toastSv.success('Cập nhật mục tiêu thành công', 'Thông báo', this.toastOptions);
          this.isLoading = false;
        },
        (err) => {
          this.errorMessage = err.message ? err.message : err.messages ? err.messages : err;
          this.isLoading = false;
        }
      )
    );
  }
}
