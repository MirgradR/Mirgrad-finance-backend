import mongoose from 'mongoose'

export interface StockResponse {
    _id: string,
    description: string,
    displaySymbol: string,
    symbol: string,
    type: string,
    mic: string,
    figi: string,
    shareClassFIGI: string,
    currency: string,
    symbol2: string,
    isin: string | null,
    __v: number
}

const Stock = new mongoose.Schema({
    description: { type: String },
    displaySymbol: { type: String },
    symbol: { type: String },
    type: { type: String },
    mic: { type: String },
    figi: { type: String },
    shareClassFIGI: { type: String },
    currency: { type: String },
    symbol2: { type: String },
    isin: { type: String },
})

export default mongoose.model('Stock', Stock)
