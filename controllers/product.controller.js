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

    return res
      .status(200)
      .json({ success: true, message: "Product saved successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

// View All Products
export const viewProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return res.status(200).json({ success: true, allProducts });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

// View Single Product
export const singleProduct = async (req, res) => {
  try {
    console.log(req.params, "single productId");
    const { productId } = req.params;
    if (!productId) {
      return res
        .status(404)
        .json({ success: false, message: "ProductId is mandatory" });
    }
    const productData = await Product.findById(productId);
    if (!productData) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found!!!" });
    }

    return res.status(200).json({ success: true, productData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

// Filter Product
export const filterProduct = async (req, res) => {
  try {
    const { category } = req.body;
    let query = {};
    if (category) {
      query = { category: category };
    }
    const products = await Product.find(query);
    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

// Sort Product
export const sortProduct = async (req, res) => {
  try {
    const { sortMethod } = req.body;
    let sortQuery = {};
    if (sortMethod == "lowToHigh") {
      sortQuery = {
        price: 1,
      };
    } else if (sortMethod === "highToLow") {
      sortQuery = {
        price: -1,
      };
    } else if (sortMethod === "newArrivals") {
      sortQuery = { createdAt: -1 }; // Sort by creation date (most recent first)
    }
    console.log(sortQuery, "Sorting Price");
    const products = await Product.find({}).sort(sortQuery);
    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

export const testingOperators = async (req, res) => {
  try {
    //comparison query operators
    // const products = await Product.find({price : {$eq :450}})
    // const products = await Product.find({price : {$ne :450}})
    // const products = await Product.find({price : {$gt :450}})
    // const products = await Product.find({price : {$gte :450}})
    // const products = await Product.find({price : {$lt :450}})
    // const products = await Product.find({price : {$lte :450}})
    // const products = await Product.find({price : {$in :[1200,40,300]}})
    // const products = await Product.find({price : {$nin :[1200,40,300]}})
    // const products = await Product.find({price : {$exists :true}})

    //logical query operators
    const { minLimit, maxLimit } = req.body;
    // const products = await Product.find({$and: [{price:{$gt: 400}},{price:{$lt:2000}}]})
    // const products = await Product.find({$and: [{price:{$gt: minLimit}},{price:{$lt:maxLimit}}]})
    // const products = await Product.find({$or: [{price:{$gt: minLimit}},{price:{$lt:maxLimit}}]})
    // const products = await Product.find({price : {$not:{$gt:350}}})
    // const products = await Product.find({$nor: [{price:{$gt:350}},{price:{$gte:350}}]})
    const products = await Product.find({ price: { $type: "string" } }); //will give empty array because all the price values are of type number
    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

export const aggregationPipeline = async (req, res) => {
  try {
    const Products = await Product.aggregate([
      {
        $match: {
          category: { $in: ["Clothing", "Electronics", "Accessory"] },
          price: { $gte: 2000 },
          quantity: { $gte: 30 },
          // tags : {$exists : true}
        }, //here 3 conditions have been applied for matching
      },
      // {
      //   $group : {
      //     _id : "$category", //_id : "product"
      //     totalOfQuantity : {$sum : "$quantity"},
      //     totalOfPrice : {$sum : {$multiply : ["$quantity", "$price"]}}
      //   }
      // }
      // {
      //   $unwind: "$tags",
      // },
      // {
      //   $project : {
      //     name : 1,
      //     price : 1,
      //     image : 1
      //   }
      // }
      {
        $project : {
          category : 0,
          __v : 0,
          updatedAt : 0,
          image : 0,
          createdBy : 0
        }
      }
    ]);
    return res.send(Products);
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};
