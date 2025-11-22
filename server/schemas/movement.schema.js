import { z } from "zod";

export const createMovementSchema = z.object({
  productId: z.string(),
  fromLocationId: z.string().nullable().optional(),
  toLocationId: z.string().nullable().optional(),
  quantity: z.number().int().positive(),
  type: z.enum(["TRANSFER", "RECEIPT", "DELIVERY", "ADJUSTMENT"]).optional(),
  createdById: z.number().optional(),
});

export const updateMovementSchema = z.object({
  status: z.string().optional(),
});
