import Product from "../models/product.schema.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      productQuantity,
      productPrice,
      productImage,
      productCategory,
    } = req.body.productData;
    const { userId } = req.body;

    // Validate required fields
    if (
      !productName ||
      !productQuantity ||
      !productImage ||
      !productCategory ||
      !userId ||
      !productPrice
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Create new product document
    const newProduct = new Product({
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      image: productImage,
      category: productCategory,
      createdBy: userId,
    });

    // Save to database
    await newProduct.save();

    return res.status(200).json({ success: true, message: "Product saved successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

// View All Products
export const viewProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return res.status(200).json({ success: true, allProducts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

// View Single Product
export const singleProduct = async (req, res) => {
  try {
    console.log(req.params,"single productId");
    const {productId} = req.params;
    if(!productId){
      return res.status(404).json({success : false, message : "ProductId is mandatory"})
    }
    const productData = await Product.findById(productId);
    if(!productData){
      return res.status(404).json({success : false, message : "Product not found!!!"}) 
    }

    return res.status(200).json({ success: true ,productData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

// Filter Product
export const filterProduct = (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

// Sort Product
export const sortProduct = (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};
