Element.prototype.getStyleValue = function (this: HTMLElement | any, styleAttr: string) {
    if (this && styleAttr) {
        const style = window.getComputedStyle(this, null) || this.currentStyle;
        if (style) {
            return style.getPropertyValue(styleAttr);
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};