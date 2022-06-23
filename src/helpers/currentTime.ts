export const currentTime = (last: number) => {
    const date = new Date()
    const year = date.getFullYear()
    const month = (+date.getMonth() - last) < 10 ? '0' + (+date.getMonth() - last) : (+date.getMonth() - last)
    const day = +date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return `${year}-${month}-${day}`
}