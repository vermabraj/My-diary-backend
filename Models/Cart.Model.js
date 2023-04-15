const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "product" },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const CartModel = model("cart", cartSchema);

module.exports = { CartModel };
