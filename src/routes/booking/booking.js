const { Router } = require("express");
const { varifyToken } = require("../../middlewares/varifyToken");
const Booking = require("../../models/booking/bookingModel");
const bookingRoute = Router();

bookingRoute.post("/", varifyToken, async (req, res) => {
  const data = req.body;
  const query = {
    car: req.body.car,
    user: req.user._id,
    bookingDate: new Date().toDateString(),
  };

  try {
    const isExists = await Booking.findOne(query);

    if (isExists) {
      return res
        .status(403)
        .send({ message: "You Already Booked this Car Today !" });
    }
    data.bookingDate = new Date().toDateString();
    data.user = req.user._id;
    const newbooking = new Booking(data);
    const result = await newbooking.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

bookingRoute.get("/", varifyToken, async (req, res) => {
  const query = {
    user: req.user._id,
  };
  try {
    const results = await Booking.find(query);
    res.send(results);
  } catch (error) {}
});

module.exports = bookingRoute;
