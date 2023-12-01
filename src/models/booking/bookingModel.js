const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
  car: [{ type: Schema.Types.ObjectId, ref: "Car" }],
  phone: {
    type: Number,
    validator: {
      minlength: 11,
      required: true,
    },
  },
  bookingDate: {
    type: Date,
  },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Booking = model("Booking", bookingSchema);
module.exports = Booking;
