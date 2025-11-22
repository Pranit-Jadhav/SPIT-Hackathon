import { prisma } from "../db.js";
import {
  createMovementSchema,
  updateMovementSchema,
} from "../schemas/movement.schema.js";

export const createMovement = async (req, res) => {
  const parsed = createMovementSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const data = {
      productId: parsed.data.productId,
      fromLocationId: parsed.data.fromLocationId || null,
      toLocationId: parsed.data.toLocationId || null,
      quantity: parsed.data.quantity,
      type: parsed.data.type || "TRANSFER",
      createdById: parsed.data.createdById || undefined,
    };
    const m = await prisma.movement.create({ data });
    res.status(201).json(m);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create movement" });
  }
};

export const listMovements = async (req, res) => {
  const list = await prisma.movement.findMany({
    include: {
      product: true,
      fromLocation: true,
      toLocation: true,
      createdBy: true,
    },
  });
  res.json(list);
};

export const getMovement = async (req, res) => {
  const { id } = req.params;
  const m = await prisma.movement.findUnique({
    where: { id },
    include: {
      product: true,
      fromLocation: true,
      toLocation: true,
      createdBy: true,
    },
  });
  if (!m) return res.status(404).json({ message: "Not found" });
  res.json(m);
};

export const updateMovement = async (req, res) => {
  const { id } = req.params;
  const parsed = updateMovementSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const updated = await prisma.movement.update({
      where: { id },
      data: parsed.data,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update" });
  }
};

export const deleteMovement = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.movement.delete({ where: { id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete" });
  }
};
