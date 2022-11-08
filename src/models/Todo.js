const { Schema, model } = require('mongoose');

const BikeSchema = new Schema({
  bike_id: {
    type: Number,
    required: true,
    unique: true,
    immutable: true,
    unique: true,
  },
  color: { type: String, required: true },
  gears: Number,
  brand: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  sold: { type: Boolean, required: true },
});

const Bike = model('Bike', BikeSchema);

module.exports = Bike;
