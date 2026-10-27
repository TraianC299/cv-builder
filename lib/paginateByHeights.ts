export function paginateByHeights(heights: number[], pageInnerHeight: number) {
    const pages: number[][] = [];
    let current: number[] = [];
    let used = 0;

    for (let i = 0; i < heights.length; i++) {
        const h = heights[i];

        // If a single block is taller than a page, we still place it alone.
        if (current.length === 0 && h > pageInnerHeight) {
            pages.push([i]);
            used = 0;
            current = [];
            continue;
        }

        if (used + h <= pageInnerHeight) {
            current.push(i);
            used += h;
        } else {
            pages.push(current);
            current = [i];
            used = h;
        }
    }

    if (current.length) pages.push(current);
    return pages;
}