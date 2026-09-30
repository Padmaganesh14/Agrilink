import mongoose from 'mongoose';

const trackingSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  orderId: { type: String, required: true },
  origin: { type: String, default: 'Trichy Farm Gate' },
  destination: { type: String, default: 'Chennai Koyambedu Wholesale Mart' },
  currentCheckpoint: { type: String, default: 'Villupuram (NH45)' },
  speedKmH: { type: Number, default: 52 },
  distanceKm: { type: Number, default: 330 },
  etaHours: { type: Number, default: 6 },
  status: { type: String, default: 'In Transit' }
}, {
  timestamps: true
});

export const Tracking = mongoose.models.Tracking || mongoose.model('Tracking', trackingSchema);
export default Tracking;
