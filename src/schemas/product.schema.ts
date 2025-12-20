import { z } from "zod";

/**
 * CREATE PRODUCT DTO
 */
export const CreateProductSchema = z.object({
	name: z.string().min(1, "El nombre es obligatorio"),
	description: z.string().optional(),
	price: z.number().positive("El precio debe ser mayor a 0"),
	originalPrice: z.number().positive("El precio debe ser mayor a 0"),
	quantity: z.number().int().min(0, "La cantidad no puede ser negativa"),
	category: z.string().min(1, "La categoria es obligatoria."),
	img_url: z.string().min(1, "El url a la imagen es obligatorio."),
}).strict();

/**
 * UPDATE PRODUCT DTO
 * - Campos opcionales
 * - Al menos uno debe venir
 */
export const UpdateProductSchema = CreateProductSchema.partial().refine(
	(data) => Object.keys(data).length > 0,
	{ message: "Al menos un campo debe ser enviado" }
);

// DTO's
export type CreateProductDTO = z.infer<typeof CreateProductSchema>;
export type UpdateProductDTO = z.infer<typeof UpdateProductSchema>;
