const { Router } = require("express");
const { authenticate } = require("../Middlewares/authenticate.middleware");

const { GalleryModel } = require("../Models/Gallery.Model");
const galleryRoute = Router();

// galleryRoute.use(authenticate)
galleryRoute.get("/", authenticate, async (req, res) => {
  const { user } = req.body;

  try {
    await GalleryModel.find({ user })
      .populate("productId")
      .then((r) => {
        return res.status(200).send(r);
      });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

galleryRoute.post("/add", authenticate, async (req, res) => {
  const productId = req.body;
  let { user } = req.body;

  try {
    let galleryItem = new GalleryModel({ user });

    await GalleryModel.insertMany(req.body);
    return res.status(200).send(galleryItem);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

galleryRoute.patch("/update/:id", authenticate, async (req, res) => {
  const _id = req.params.id;
  const payload = req.body;
  try {
    await GalleryModel.findOneAndUpdate({ _id }, payload);
    res.send({ msg: `Product with id:${_id} has been updated` });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

galleryRoute.delete("/delete/:id", authenticate, async (req, res) => {
  const _id = req.params.id;

  try {
    await GalleryModel.findOneAndDelete({ _id });
    res.send({ msg: `Product with id:${_id} has been deleted` });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

module.exports = { galleryRoute };
