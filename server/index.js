// import express from "express";
import { prisma } from "./db.js";

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import warehouseRoutes from "./routes/warehouse.routes.js";
import locationRoutes from "./routes/location.routes.js";
import stockRoutes from "./routes/stock.routes.js";
import receiptRoutes from "./routes/receipt.routes.js";
import deliveryRoutes from "./routes/delivery.routes.js";
import movementRoutes from "./routes/movement.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

// mount auth routes
app.use("/auth", authRoutes);

// api resources
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/receipts", receiptRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/movements", movementRoutes);

app.listen(PORT, () => {
  console.log(`server running on the port ${PORT}`);
});
//   }
