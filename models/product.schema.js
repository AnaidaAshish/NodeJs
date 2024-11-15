import { Schema,model } from "mongoose";

const productSchema = Schema({
    name : String,
    price : Number,
    quantity : Number,
    image : String,
    category : String,
    createdBy : String,
})

const Product = model("Product",productSchema)

export default Product;