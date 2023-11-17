import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[usernameValidate]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: UsernameValidateDirective,
    multi: true
  }]
})
export class UsernameValidateDirective {
  @Input() usernameValidate: { min?: number; max?: number; } | undefined;

  constructor(private element: ElementRef) { }

  validate(control: AbstractControl): { [key: string]: any } {
    let error: any = null;

    if (control && (control.dirty || control.touched) && control.value != null) {
      if (!this.usernameValidate) {
        this.usernameValidate = {};
      }
      this.usernameValidate.min = this.usernameValidate.min ?? 1;
      this.usernameValidate.max = this.usernameValidate.max ?? 250;

      const regex = new RegExp('^[\\w_@.\\-$]{' + this.usernameValidate.min + ',' + this.usernameValidate.max + '}$');
      const isValid = regex.test(control.value);
      error = isValid ? null : { invalid: true };

      const element = this.element.nativeElement as HTMLInputElement;
      const spanMess = element.nextElementSibling;
      const spanMessID = (element.name ?? element.id ?? 'username') + '-input-message-text';

      if (element) {
        if (!isValid) {
          let mess = 'Không được nhập khoảng trắng, tab, ký tự có dấu và các ký tự đặc biệt';

          if (this.usernameValidate.min && (control.value.length < this.usernameValidate.min)) {
            mess = `Tối thiểu ${this.usernameValidate.min} ký tự`;
          }
          else if (this.usernameValidate.max && (control.value.length > this.usernameValidate.max)) {
            mess = mess = `Tối đa ${this.usernameValidate.max} ký tự`;
          }

          if (spanMess && spanMess.id === spanMessID) {
            spanMess.innerHTML = mess;
          }
          else {
            const htmlStr = `<div class="text-danger mt-1" id="${spanMessID}">${mess}</div>`;
            element.insertAdjacentHTML('afterend', htmlStr);
          }
        }
        else {
          spanMess?.remove();
        }
      }
    }

    return error;
  }

}
