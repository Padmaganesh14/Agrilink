import mongoose from 'mongoose';

const marketRecordSchema = new mongoose.Schema({
  date: { type: String, required: true },
  state: { type: String, required: true, default: 'Tamil Nadu' },
  district: { type: String, required: true },
  market: { type: String, required: true },
  commodity: { type: String, required: true },
  variety: { type: String, default: 'Local' },
  grade: { type: String, default: 'Grade A' },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  modalPrice: { type: Number, required: true }
}, {
  timestamps: true
});

export const MarketRecord = mongoose.models.MarketRecord || mongoose.model('MarketRecord', marketRecordSchema);
export default MarketRecord;
