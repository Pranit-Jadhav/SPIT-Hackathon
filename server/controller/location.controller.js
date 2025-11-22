import { prisma } from "../db.js";
import {
  createLocationSchema,
  updateLocationSchema,
} from "../schemas/location.schema.js";

export const createLocation = async (req, res) => {
  const parsed = createLocationSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const loc = await prisma.location.create({ data: parsed.data });
    res.status(201).json(loc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create location" });
  }
};

export const listLocations = async (req, res) => {
  const locs = await prisma.location.findMany({
    include: { warehouse: true, stocks: true },
  });
  res.json(locs);
};

export const getLocation = async (req, res) => {
  const { id } = req.params;
  const loc = await prisma.location.findUnique({
    where: { id },
    include: { warehouse: true, stocks: true },
  });
  if (!loc) return res.status(404).json({ message: "Not found" });
  res.json(loc);
};

export const updateLocation = async (req, res) => {
  const { id } = req.params;
  const parsed = updateLocationSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const updated = await prisma.location.update({
      where: { id },
      data: parsed.data,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update" });
  }
};

export const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.location.delete({ where: { id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete" });
  }
};
