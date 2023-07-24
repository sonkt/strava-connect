import { ChangeDetectorRef, Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { ElementHelper } from '../helpers/element-helper';

@Directive({
    selector: '[passwordValidate]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: PasswordValidateDirective,
        multi: true
    }]
})
export class PasswordValidateDirective implements OnInit {
    /** 
     * @param min số ký tự tối thiểu. Mặc định: 8
     * @param max số ký tự tối đa. Mặc định: 200
     * @param level Mặc định: Level 2
     * @Level1 Tối thiểu Min ký tự, không có ký tự đặc biệt
     * @Level2 Level 1 + ít nhất một chữ cái và một số
     * @Level3 Level 1 + ít nhất một chữ hoa, một chữ thường và một số
     * @Level4 Level 3 + ít nhất một ký tự đặc biệt
     * @compareValue so sánh với 1 giá trị khác - Sử dụng nếu control là mật khẩu xác nhận
     * @rePasswordControl Khi control mật khẩu chính thay đổi, rePasswordControl sẽ được valid lại tự động (Sử dụng khi control là mật khẩu chính)
     */
    @Input() passwordValidate: {
        min?: number,
        max?: number,
        level?: 1 | 2 | 3 | 4,
        compareValue?: string,
        rePasswordControl?: AbstractControl
    } | any;

    constructor(private element: ElementRef, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        // this.addEye();
        const element = this.element.nativeElement as HTMLInputElement;
        if (element) {
            window.addEventListener('resize', () => {
                const eye = element.previousElementSibling as HTMLElement;
                if (eye && eye.tagName.toLowerCase() === 'i') {
                    const elementMargin = element.getStyleValue('margin-top');
                    eye.setAttribute('style', 'position: absolute;cursor: pointer;right: 10px;top: ' + (element.offsetHeight / 2 + (elementMargin ? Number.parseFloat(elementMargin) : 0) - eye.offsetHeight / 2) + 'px;');
                }
            });
            element.addEventListener('input', () => {
                if (this.passwordValidate.rePasswordControl && this.passwordValidate.rePasswordControl.value) {
                    if (this.passwordValidate.rePasswordControl.value.length > 0) {
                        const backupValue = this.passwordValidate.rePasswordControl.value;
                        this.passwordValidate.rePasswordControl.markAsTouched();
                        this.passwordValidate.rePasswordControl.setValue(backupValue);
                        this.cdr.detectChanges();
                        this.passwordValidate.rePasswordControl.updateValueAndValidity();
                    }
                }
            });
        }
    }

    validate(control: AbstractControl): { [key: string]: any } | undefined {
        let error: { invalid: boolean } | undefined;

        if (control && (control.dirty || control.touched) && control.value != null) {
            // Gán các giá trị nếu chưa có
            if (!this.passwordValidate) {
                this.passwordValidate = {};
            }
            this.passwordValidate.min = this.passwordValidate.min ?? 8;
            this.passwordValidate.max = this.passwordValidate.max ?? 200;
            this.passwordValidate.level = this.passwordValidate.level ?? 2;
            // Lấy regex và message tương ứng với level
            let mess = 'Không được nhập khoảng trắng, tab, ký tự có dấu và các ký tự đặc biệt';
            let regexStr = '[a-zA-Z\\d\\w\\W._-]{' + this.passwordValidate.min + ',' + this.passwordValidate.max + '}';
            switch (this.passwordValidate.level) {
                case 2:
                    regexStr = '(?=.*[A-Za-z])(?=.*\\d)' + regexStr;
                    mess = 'Mật khẩu phải có cả chữ và số';
                    break;
                case 3:
                    regexStr = '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)' + regexStr;
                    mess = 'Mật khẩu phải bao gồm chữ hoa, chữ thường và số';
                    break;
                case 4:
                    regexStr = '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&._-])' + regexStr;
                    mess = 'Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt được cho phép (@$!%*?&._-)';
                    break;
                default:
                    break;
            }
            const regex = new RegExp('^' + regexStr + '$');
            let isValid = regex.test(control.value);
            if (this.passwordValidate.compareValue && control.value.trim() !== this.passwordValidate.compareValue.trim()) {
                isValid = false;
            }
            error = isValid ? undefined : { invalid: true };
            // Hiển thị text cảnh báo bên dưới input
            const element = this.element.nativeElement as HTMLInputElement;
            const spanMess = element.nextElementSibling;
            const spanMessID = (element.name ?? element.id ?? 'password') + '-input-message-text';
            if (element) {
                if (!isValid) {
                    if (this.passwordValidate.min && (control.value.length < this.passwordValidate.min)) {
                        mess = `Tối thiểu ${this.passwordValidate.min} ký tự`;
                    }
                    else if (this.passwordValidate.max && (control.value.length > this.passwordValidate.max)) {
                        mess = `Tối đa ${this.passwordValidate.max} ký tự`;
                    }
                    else if (this.passwordValidate.compareValue && control.value.trim() !== this.passwordValidate.compareValue.trim()) {
                        mess = 'Mật khẩu xác nhận không trùng khớp';
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


    /** Thêm nút ẩn/hiện password */
    addEye() {
        ElementHelper.onDocumentReady(() => {
            const element = this.element.nativeElement as HTMLInputElement;
            if (element) {
                const eye = document.createElement('i');
                eye.className = element.type === 'password' ? 'far fa-eye' : 'far fa-eye-slash';
                eye.title = element.type === 'password' ? 'Hiện' : 'Ẩn';
                eye.onclick = () => {
                    if (element.type === 'password') {
                        element.setAttribute('type', 'text');
                        eye.className = 'far fa-eye-slash';
                        eye.title = 'Ẩn';
                    }
                    else {
                        element.setAttribute('type', 'password');
                        eye.className = 'far fa-eye';
                        eye.title = 'Hiện';
                    }
                };

                if (element.parentElement) {
                    element.parentElement.style.position = 'relative';
                }

                element.insertAdjacentElement('beforebegin', eye);
                const elementMargin = element.getStyleValue('margin-top');
                eye.setAttribute('style', 'position: absolute;cursor: pointer;right: 10px;top: ' + (element.offsetHeight / 2 + (elementMargin ? Number.parseFloat(elementMargin) : 0) - eye.offsetHeight / 2) + 'px;');
            }
        });
    }
}
