import { prisma } from "../db.js";
import {
  createWarehouseSchema,
  updateWarehouseSchema,
} from "../schemas/warehouse.schema.js";

export const createWarehouse = async (req, res) => {
  const parsed = createWarehouseSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const w = await prisma.warehouse.create({ data: parsed.data });
    res.status(201).json(w);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create warehouse" });
  }
};

export const listWarehouses = async (req, res) => {
  const ws = await prisma.warehouse.findMany({ include: { locations: true } });
  res.json(ws);
};

export const getWarehouse = async (req, res) => {
  const { id } = req.params;
  const w = await prisma.warehouse.findUnique({
    where: { id },
    include: { locations: true },
  });
  if (!w) return res.status(404).json({ message: "Not found" });
  res.json(w);
};

export const updateWarehouse = async (req, res) => {
  const { id } = req.params;
  const parsed = updateWarehouseSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const updated = await prisma.warehouse.update({
      where: { id },
      data: parsed.data,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update" });
  }
};

export const deleteWarehouse = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.warehouse.delete({ where: { id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete" });
  }
};
