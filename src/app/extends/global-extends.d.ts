declare global {
    interface Date {
        clone?(): Date;
        /** Định dạng ngày tháng */
        format(formatSring: string): string;
        getDaysBetween?(compareDate: Date): number;
        getSecondsBetween?(compareDate: Date): number;
        addDays?(days: number): Date;
        addMinutes?(minutes: number): Date;
        addMonths?(months: number): Date;
        /** Tính thời gian thực hiện giữa 2 thời điểm */
        getTimeExcute?(endTime: Date): number;
        /** Đặt giờ về đầu ngày 00:00:00 */
        setStartTime?(): Date;
        /** Đặt giờ về cuối ngày 23:59:59 */
        setEndTime?(): Date;
        /** Cộng thêm giờ */
        addHour?(hour: number): Date;
    }

    interface Number {
        /** Chuyển số phút sang định dạng giờ:phút:giây
         * VD: 120 => 02:00:00
         * @param showSeconds: hiển thị số giây. Mặc định: false
         */
        toHourFormat(showSeconds?: boolean): string;
        toHourFormatWithString(showSeconds?: boolean, typeFormat?: string): string;
        format(digitsInfo?: string, locale?: string): string;
        formatPercent(digitsInfo?: string, locale?: string): string;
    }

    interface String {
        /** Hàm chuyển tiếng việt có dấu sang không dấu */
        removeAccents(): string;
        replaceWhitespace(newCharacter: string): string;
        toBoolean(): boolean;
        format(...variables: any[]): string;
        /**
         * Lấy chuỗi từ trái qua phải
         * @param len Số ký tự cần lấy
         * @param skipRight Dùng để lấy chuỗi cách bên phải một số ký tự
         * @ VD: Với skipRight = true và len = 1 thì 'abc' => 'ab', len = 2 thì 'abc' => 'a'
         */
        left(len: number, skipRight?: boolean): string;
        /**
         * Lấy chuỗi từ phải qua trái
         * @param len Số ký tự cần lấy
         */

    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Array<T> {
        /**
         * Sắp xếp mảng nguyên thủy hoặc mảng object - hỗ trợ nhiều cấp lồng nhau
         * @param fieldName Tên trường cần sắp xếp (Chỉ sử dụng cho mảng object). Sử dụng dấu . trong fiedNames để lấy theo nhiều cấp lồng nhau. Ví dụ: "vehicle.id"
         * @param sortDESC Sắp xếp giảm dần. Mặc định: False
         */
        sortAdvanced(fieldName?: string, sortDESC?: boolean): T[];
        toTree(idField: string, parentIDField: string, childrenField: string): T[];
    }

    interface Element {
        scrollTo(): void;
        getStyleValue(styleAttr: string): string | any;
    }

    /**
     * Lấy url API nhanh
     * @param childPaths danh sách các route con theo thứ tự
     * @param [hostAddress] Mặc định: environment.api.baseUrl
     * @param [port] Mặc định: environment.api.basePort
     * @returns  API url
     */
    function getAPIUrl(childPaths: any[], hostAddress?: string, port?: number): string;

    /** Lấy tên thuộc tính dạng string */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function nameOf<T>(): { [P in keyof T]: P; };
}

declare module '@angular/forms' {
    interface NgForm {
        forceValidate(): void;
    }

    interface FormGroup {
        forceValidate(): void;
    }
}

export { };

