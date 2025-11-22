import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  unit: z.string().min(1),
  reorderLevel: z.number().int().optional(),
  categoryId: z.string().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  sku: z.string().min(1).optional(),
  unit: z.string().min(1).optional(),
  reorderLevel: z.number().int().optional(),
  categoryId: z.string().nullable().optional(),
});
