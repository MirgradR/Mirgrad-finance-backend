import mongoose from 'mongoose'

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
