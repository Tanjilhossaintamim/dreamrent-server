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
carRouter.get("/mycar", varifyOwner, async (req, res) => {
  const owner_id = req.user._id;
  const page = req.query?.page;
  const limit = 6;
  const skip = (parseInt(page) - 1) * limit;
  const query = {
    owner: owner_id,
  };
  try {
    const count = await Car.countDocuments(query);
    const results = await Car.find(query).limit(limit).skip(skip);
    res.send({ count, results });
  } catch (error) {
    res.status(401).send(error);
  }
});
carRouter.delete("/mycar/:id", varifyOwner, async (req, res) => {
  const _id = req.params.id;
  const owner = req.user._id;
  const filter = {
    _id,
    owner,
  };
  try {
    const result = await Car.deleteOne(filter);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});
carRouter.patch("/mycar/:id", varifyOwner, async (req, res) => {
  const _id = req.params.id;
  const owner = req.user._id;
  try {
    const result = await Car.updateOne({ _id, owner }, { ...req.body });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = carRouter;
