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

export interface StockPrice {
    o: number,  //Current price
    h: number,  //Change
    l: number,  //Percent change
    c: number,  //High price of the day
    pc: number, //Low price of the day
    d: number,  //Open price of the day
    dp: number  //Previous close price
}

export interface StockProfile {
    country: string,
    currency: string,
    exchange: string,
    name: string,
    ticker: string,
    ipo: string,
    marketCapitalization: number,
    shareOutstanding: number,
    logo: string,
    phone: string,
    weburl: string,
    finnhubIndustry: string,
    owner?: string
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
