const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "product" },
   
    date: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    }
  },
  {
    versionKey: false,
  }
);

const GalleryModel = model("gallery", cartSchema);

module.exports = { GalleryModel };
