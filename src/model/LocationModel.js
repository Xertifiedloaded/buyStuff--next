// models/Location.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const locationSchema = new mongoose.Schema({
  locationId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  exactLocation: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);
export default Location;