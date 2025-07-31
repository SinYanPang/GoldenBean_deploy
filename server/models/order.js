import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  drink: {
    type: String,
    required: true,
  },
  dineIn: {
    type: Boolean,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Order', OrderSchema);