import { prisma } from "../db.js";
import { updateStockSchema } from "../schemas/stock.schema.js";

export const listStocks = async (req, res) => {
  const stocks = await prisma.stock.findMany({
    include: { product: true, location: true },
  });
  res.json(stocks);
};

export const getStock = async (req, res) => {
  const { id } = req.params;
  const s = await prisma.stock.findUnique({
    where: { id },
    include: { product: true, location: true },
  });
  if (!s) return res.status(404).json({ message: "Not found" });
  res.json(s);
};

export const updateStock = async (req, res) => {
  const { id } = req.params;
  const parsed = updateStockSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const updated = await prisma.stock.update({
      where: { id },
      data: parsed.data,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update stock" });
  }
};
