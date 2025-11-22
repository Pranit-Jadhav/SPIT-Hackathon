import { prisma } from "../db.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema.js";

export const createProduct = async (req, res) => {
  const parsed = createProductSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const product = await prisma.product.create({ data: parsed.data });
    return res.status(201).json(product);
  } catch (err) {
    console.error(err);
    // Handle unique constraint (sku)
    if (err.code === "P2002") {
      return res
        .status(400)
        .json({
          message: "Unique constraint failed",
          target: err.meta?.target,
        });
    }
    return res.status(500).json({ message: "Failed to create product" });
  }
};

export const listProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, stocks: true },
    });
    return res.json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to list products" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, stocks: true },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get product" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const parsed = updateProductSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const updated = await prisma.product.update({
      where: { id },
      data: parsed.data,
    });
    return res.json(updated);
  } catch (err) {
    console.error(err);
    if (err.code === "P2002") {
      return res
        .status(400)
        .json({
          message: "Unique constraint failed",
          target: err.meta?.target,
        });
    }
    return res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id } });
    return res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete product" });
  }
};
