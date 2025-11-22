import { z } from "zod";

export const updateStockSchema = z.object({
  quantity: z.number().int().optional(),
  reserved: z.number().int().optional(),
});
