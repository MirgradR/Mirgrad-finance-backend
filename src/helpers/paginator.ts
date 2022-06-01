import { News } from "../models/News"

export const paginateData = (data: News[], limit: number = 10, offset: number = 1) => {
    const maximum = limit * offset
    return data.filter((item, i) => {
        return i >= maximum - limit && i < maximum
    })
}
