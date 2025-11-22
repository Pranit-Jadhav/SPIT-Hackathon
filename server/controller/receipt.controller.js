import { prisma } from "../db.js";
import {
  createReceiptSchema,
  updateReceiptSchema,
} from "../schemas/receipt.schema.js";

export const createReceipt = async (req, res) => {
  const parsed = createReceiptSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const data = {
      supplier: parsed.data.supplier,
      createdById: parsed.data.createdById || undefined,
      items: {
        create: parsed.data.items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      },
    };
    const r = await prisma.receipt.create({ data });
    res.status(201).json(r);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create receipt" });
  }
};

export const listReceipts = async (req, res) => {
  const receipts = await prisma.receipt.findMany({
    include: { items: { include: { product: true } }, createdBy: true },
  });
  res.json(receipts);
};

export const getReceipt = async (req, res) => {
  const { id } = req.params;
  const r = await prisma.receipt.findUnique({
    where: { id },
    include: { items: { include: { product: true } }, createdBy: true },
  });
  if (!r) return res.status(404).json({ message: "Not found" });
  res.json(r);
};

export const updateReceipt = async (req, res) => {
  const { id } = req.params;
  const parsed = updateReceiptSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const updated = await prisma.receipt.update({
      where: { id },
      data: parsed.data,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update" });
  }
};

export const deleteReceipt = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.receipt.delete({ where: { id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete" });
  }
};
