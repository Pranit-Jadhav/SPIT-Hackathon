import { z } from "zod";

export const createDeliverySchema = z.object({
  customer: z.string().optional(),
  createdById: z.number().optional(),
  items: z.array(
    z.object({ productId: z.string(), quantity: z.number().int().positive() })
  ),
});

export const updateDeliverySchema = z.object({
  customer: z.string().optional(),
  status: z.string().optional(),
});
