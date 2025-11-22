import { prisma } from "../db.js";
import {
  createDeliverySchema,
  updateDeliverySchema,
} from "../schemas/delivery.schema.js";

export const createDelivery = async (req, res) => {
  const parsed = createDeliverySchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const data = {
      customer: parsed.data.customer,
      createdById: parsed.data.createdById || undefined,
      items: {
        create: parsed.data.items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      },
    };
    const d = await prisma.delivery.create({ data });
    res.status(201).json(d);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create delivery" });
  }
};

export const listDeliveries = async (req, res) => {
  const deliveries = await prisma.delivery.findMany({
    include: { items: { include: { product: true } }, createdBy: true },
  });
  res.json(deliveries);
};

export const getDelivery = async (req, res) => {
  const { id } = req.params;
  const d = await prisma.delivery.findUnique({
    where: { id },
    include: { items: { include: { product: true } }, createdBy: true },
  });
  if (!d) return res.status(404).json({ message: "Not found" });
  res.json(d);
};

export const updateDelivery = async (req, res) => {
  const { id } = req.params;
  const parsed = updateDeliverySchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const updated = await prisma.delivery.update({
      where: { id },
      data: parsed.data,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update" });
  }
};

export const deleteDelivery = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.delivery.delete({ where: { id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete" });
  }
};
