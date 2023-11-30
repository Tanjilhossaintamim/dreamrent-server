const { Schema, model } = require("mongoose");

const carSchema = new Schema({
  name: {
    type: String,
    validator: {
      minlength: 4,
      required: true,
    },
  },
  brand: {
    type: String,
    validator: {
      minlength: 4,
      required: true,
    },
  },
  service_area: {
    type: String,
    validator: {
      minlength: 4,
      required: true,
    },
  },
  service_area_to: {
    type: String,
    validator: {
      minlength: 4,
      required: true,
    },
  },
  rent_price: {
    type: Number,
    validator: {
      minlength: 4,
      required: true,
    },
  },
  image_url: {
    type: String,
    validator: {
      minlength: 20,
      required: true,
    },
  },
  owner: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Car = model("Car", carSchema);
module.exports = Car;
