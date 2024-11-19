import { Router } from "express";
import {createProduct,viewProducts,singleProduct,filterProduct,sortProduct,testingOperators} from "../controllers/product.controller.js";
import { checkUserValid } from "../middlewares/product.middleware.js";

const productRoutes = Router();

productRoutes.post("/create-product",checkUserValid,createProduct);
productRoutes.get("/view-products",viewProducts);
productRoutes.post("/single-product/:productId",singleProduct);
productRoutes.post("/filter-product",filterProduct);
productRoutes.post("/sort-product",sortProduct);
productRoutes.post("/testing-operators",testingOperators);

export default productRoutes;