const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const contactRoutes = require("./routes/contactRoutes");
dotenv.config();
const authRoutes = require("./routes/authRoutes")

const app = express();
// Allow requests from your frontend
app.use(
  cors({
    origin: "*", 
    credentials: true,               // allow headers/cookies
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:5173", // your React dev server
//     credentials: true,               // allow headers/cookies
//   })
// );
app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));



const PORT = (process.env.PORT) || 3000;

//Connect to Database
connectDB();


app.get("/", (req, res)=> {
    res.send("Welcome to AARYAN PRINTS API!");
});

//API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscriberRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);


// Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);


app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})