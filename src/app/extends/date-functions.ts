import { DatePipe } from '@angular/common';
import { CurrentLocaleID } from '../data/locale.data';


Date.prototype.clone = function () {
    if (this) {
        return new Date(this);
    }
    else {
        return this;
    }
};

Date.prototype.format = function (this: Date, formatSring: string): any {
    const datePipe = new DatePipe(CurrentLocaleID);
    return datePipe.transform(this, formatSring);
};

Date.prototype.getDaysBetween = function (this: Date, compareDate: Date) {
    if (this && compareDate) {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        return Math.round(Math.abs((this.getTime() - compareDate.getTime()) / (oneDay)));
    }
    else {
        return 0;
    }
};

Date.prototype.getSecondsBetween = function (this: Date, compareDate: Date) {
    if (this && compareDate) {
        return Math.abs((this.getTime() - compareDate.getTime()) / 1000);
    }
    else {
        return 0;
    }
};

Date.prototype.addDays = function (this: Date, days: number) {
    if (this && days != null) {
        return new Date(this.setDate(this.getDate() + days));
    }
    else {
        return this;
    }
};

Date.prototype.addMinutes = function (this: Date, minutes: number): Date {
    return new Date(this.getTime() + minutes * 60000);
};

Date.prototype.addMonths = function (this: Date, months: number): Date {
    const result = new Date(this.getTime());
    result.setMonth(result.getMonth() + months);
    return result;
};

Date.prototype.setStartTime = function (this: Date) {
    if (this) {
        return new Date(this.setHours(0, 0, 0));
    }
    else {
        return this;
    }
};

Date.prototype.setEndTime = function (this: Date) {
    if (this) {
        return new Date(this.setHours(23, 59, 59, 999));
    }
    else {
        return this;
    }
};

Date.prototype.addHour = function (this: Date, hour: number) {
    if (this) {
        return new Date(this.setHours(this.getHours() + hour));
    }
    else {
        return this;
    }
};