import { Schema,model } from "mongoose";
import mongoose from "mongoose";
const productSchema = Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
      { timestamps: true } )

const Product = model("Product",productSchema)

export default Product;