import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  crop: { type: String, required: true },
  quantityKg: { type: Number, required: true },
  ratePerKg: { type: Number, required: true },
  totalValue: { type: Number, required: true },
  status: { type: String, default: 'Payment Coordination' },
  buyer: {
    name: { type: String, required: true },
    location: { type: String, default: 'Chennai' }
  },
  pickupLocation: { type: String, default: 'Trichy Farm Gate' },
  deliveryLocation: { type: String, default: 'Chennai Koyambedu Wholesale Mart' },
  transport: {
    name: { type: String, default: 'Tamil Nadu Agro Logistics' },
    vehicle: { type: String, default: 'Eicher Pro 2049 (14 FT)' },
    estimatedCost: { type: Number, default: 3600 }
  },
  paymentCoordinated: { type: Boolean, default: true }
}, {
  timestamps: true
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
