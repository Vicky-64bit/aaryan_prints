const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middlewares/authMiddelware");

const router = express.Router();

// @route GET /api/products/check-sku
// @desc Check if SKU already exists
// @access Private/Admin
router.get("/check-sku", protect, admin, async (req, res) => {
  try {
    const { sku } = req.query;
    
    if (!sku) {
      return res.status(400).json({ message: "SKU parameter is required" });
    }

    const existingProduct = await Product.findOne({ sku });
    
    res.json({ exists: !!existingProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/products
// @desc Create a new Product
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    // Check for duplicate SKU
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({ message: "Product with this SKU already exists" });
    }

    // Validate required fields
    if (!name || !description || !sku || !category) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id, // Reference to the admin user who created it
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).send("Server Error");
  }
});

// @route PUT /api/products/:id
// @desc Update an existing product by Id
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    // Find product by Id
    const product = await Product.findById(req.params.id);

    if (product) {
      // Check for duplicate SKU if SKU is being changed
      if (sku && sku !== product.sku) {
        const existingProduct = await Product.findOne({ sku });
        if (existingProduct) {
          return res.status(400).json({ message: "Product with this SKU already exists" });
        }
      }

      // Update product Fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      // Save the updated Product
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/products/:id
// @desc Delete a product by ID
// @access Private/Admin
router.delete("/:id", protect, admin, async(req, res)=>{
    try {
        // Find the product by ID
        const product = await  Product.findById(req.params.id);
        
        if(product){
            // Remove the product from DB
            await product.deleteOne();
            res.json({message: "Product removed"});
        } else{
            res.status(404).json({message: "Product not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// @route GET /api/products
// @desc Get all products with optional query filters
// @access Public
router.get("/", async(req,res)=>{
    try{
        const {collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit} = req.query;

        let query = {};

        //Filter Logic
        if(collection && collection.toLocaleLowerCase() !== "all") {
            query.collection = collection;
        }

        if(category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
        }

        if(material) {
            query.material = {$in: material.split(",") };
        }
        if(brand) {
            query.brand = {$in: brand.split(",") };
        }
        if(size) {
            query.sizes = {$in: size.split(",") };
        }
        if(color) {
            query.colors = {$in: [color] };
        }
        if(gender) {
            query.gender = gender;
        }

        if(minPrice || maxPrice){
            query.price = {};
            if(minPrice) query.price.$gte = Number(minPrice);
            if(maxPrice) query.price.$lte = Number(maxPrice);
        }

        if(search) {
            query.$or = [
                {name: {$regex: search, $options: "i"}},
                {description: {$regex: search, $options: "i"}},
            ]
        }

        // Sort Logic
        let sort = {};
        if(sortBy) {
            switch(sortBy) {
                case "priceAsc":
                    sort = {price: 1};
                    break;
                case "priceDesc": 
                    sort = {price: -1};
                    break;
                case "popularity":
                    sort = {rating: -1};
                    break;
                case "newest":
                    sort = {createdAt: -1};
                    break;
                default:
                    break;            
            }
        }

        // Fetch products and apply sorting and limit
        let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access Public
router.get("/best-seller", async (req, res)=>{
    try {
        const bestSeller = await Product.findOne().sort({rating: -1});
        if(bestSeller){
            res.json(bestSeller);
        } else {
            res.status(404).json({message: "No best seller found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
        
    }
});

// @route GET /api/products/new-arrivals
// @desc Retrieve latest 12 products --> Creation date
// @access Public
router.get("/new-arrivals", async (req, res)=>{
    try {
        //Fetch latest 12 products
        const newArrivals = await Product.find().sort({createdAt: -1}).limit(12);
        res.json(newArrivals);
    } catch (error) {
        console.error(error);
        res.status(500).send("Serever Error");
                
    };
});



// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product's gender an category
// @access Public
router.get("/similar/:id", async(req, res)=>{
    const {id} = req.params;
    try {
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        const similarProducts = await Product.find({
            _id: { $ne: id}, // Exclude the current product ID
            gender: product.gender,
            category: product.category,
        }).limit(12);

        res.json(similarProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
        
    }
})


// @route GET /api/products/frequently-bought-together
// @desc Get products frequently bought together for a given product
// @access Public
router.get("/frequently-bought-together", async (req, res) => {
  const { productId, limit } = req.query;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  try {
    // Fetch the reference product
    const baseProduct = await Product.findById(productId);
    if (!baseProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Fetch related products (same category or brand, exclude base product)
    const products = await Product.find({
      _id: { $ne: baseProduct._id },
      $or: [
        { category: baseProduct.category },
        { brand: baseProduct.brand },
      ],
    })
      .limit(Number(limit) || 8)
      .sort({ rating: -1 }); // Optional: sort by rating/popularity

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public
router.get("/:id", async(req, res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(product) {
            res.json(product);
        } else {
            res.status(404).json({message: "Product not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
        
    }
});

module.exports = router;