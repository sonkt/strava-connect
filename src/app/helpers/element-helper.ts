export class ElementHelper {
    /** Độ cao của toàn bộ menu (menu chính + toolbar) - Sử dụng để tính margin top */
    static menuHeight = 0;

    /** Xảy ra khi DOM đã được tải. Xảy ra trước onPageLoaded */
    static onDocumentReady(handler: () => void) {
        $(handler);
    }
}
