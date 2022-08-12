export function fontColor(color: string) {
    if (color) {
        const rgb = parseInt(color.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = rgb & 0xff;
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 150 ? "#000" : "#fff";
    }
    return '#000';
}
