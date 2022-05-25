export const simpleSort = (data: unknown[], field: string) => {
    return data.sort((a: unknown, b: unknown) => {
        if (a[field] > b[field]) {
            return 1;
        }
        if (a[field] < b[field]) {
            return -1;
        }
        return 0;
    })
}
