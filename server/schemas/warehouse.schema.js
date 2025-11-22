import { z } from "zod";

export const createWarehouseSchema = z.object({
  name: z.string().min(1),
  code: z.string().optional(),
  address: z.string().optional(),
});

export const updateWarehouseSchema = z.object({
  name: z.string().min(1).optional(),
  code: z.string().optional(),
  address: z.string().optional(),
});
