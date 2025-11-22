import { z } from "zod";

export const createLocationSchema = z.object({
  name: z.string().min(1),
  code: z.string().optional(),
  warehouseId: z.string().min(1),
});

export const updateLocationSchema = z.object({
  name: z.string().min(1).optional(),
  code: z.string().optional(),
  warehouseId: z.string().optional(),
});
