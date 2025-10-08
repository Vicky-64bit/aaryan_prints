const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./products.js");

dotenv.config();

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // create a default admin user
    const craetedUser = await User.create({
      firstName: "AdminUser",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
      mobile: "6378141025",
    });

    // Assign the deafult userID to each product
    const userID = craetedUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    // Insert the products into the database
    await Product.insertMany(sampleProducts);
    console.log("Product data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data:", error);
    process.exit(1);
  }
};

seedData();
