const { Router } = require("express");
const { varifyOwner } = require("../../middlewares/varifyOwner");
const Car = require("../../models/car/carMode");

const carRouter = Router();

carRouter.post("/", varifyOwner, async (req, res) => {
  const data = req.body;
  data.owner = req.user._id;

  try {
    const newCar = new Car(data);
    const result = await newCar.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

carRouter.get("/", async (req, res) => {
  const page = parseInt(req.query?.page);
  const limit = parseInt(req.query?.limit) || 6;
  const skip = (page - 1) * limit;
  try {
    const totalCar = await Car.countDocuments();
    const results = await Car.find()
      .limit(limit)
      .skip(skip)
      .populate({
        path: "owner",
        select: ["email", "is_owner"],
      });
    res.send({ totalCar, cars: results });
  } catch (error) {}
});
carRouter.get("/search", async (req, res) => {
  let query = {};
  if (req.query?.from) {
    query.service_area = req.query.from;
  }
  if (req.query?.to) {
    query.service_area_to = req.query.to;
  }

  if (!query?.service_area || !query?.service_area_to) {
    return res.status(403).send({ message: "no query params !" });
  }
  try {
    const results = await Car.find(query);
    res.send({ cars: results });
  } catch (error) {}
});

module.exports = carRouter;
