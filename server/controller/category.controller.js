import { prisma } from "../db.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema.js";

export const createCategory = async (req, res) => {
  const parsed = createCategorySchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const cat = await prisma.category.create({
      data: { name: parsed.data.name },
    });
    res.status(201).json(cat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create category" });
  }
};

export const listCategories = async (req, res) => {
  const cats = await prisma.category.findMany({ include: { products: true } });
  res.json(cats);
};

export const getCategory = async (req, res) => {
  const { id } = req.params;
  const cat = await prisma.category.findUnique({
    where: { id },
    include: { products: true },
  });
  if (!cat) return res.status(404).json({ message: "Category not found" });
  res.json(cat);
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const parsed = updateCategorySchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const updated = await prisma.category.update({
      where: { id },
      data: parsed.data,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({ where: { id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete" });
  }
};
