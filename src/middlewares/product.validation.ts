import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/http.errors";

export interface FieldValidationError {
	field: string;
	message: string;
}
export class ValidationError extends BadRequestError {
	public readonly errors: FieldValidationError[];

	constructor(
		errors: FieldValidationError[],
		message = "Errores de validación. Verifique los campos enviados."
	) {
		super(message);
		this.errors = errors;

		Object.setPrototypeOf(this, ValidationError.prototype);
	}
}

// Middleware centralizado de manejo de errores de validación
export const validate = (req: Request, res: Response, next: NextFunction) => {
	const result = validationResult(req);

	if (result.isEmpty()) {
		return next();
	}

	const errors = result.array().map((err) => ({
		field: err.type === "field" ? err.path : "unknown",
		message: err.msg,
	}));

	// Propagamos el error para que sea capturado por el error.middleware.ts
	return next(new ValidationError(errors));
};

// Reglas para CREAR un producto (POST)
export const createProductValidationRules = [
	// Nombre (Requerido, no vacío, cadena)
	body("name")
		.isString()
		.withMessage("El nombre debe ser una cadena.")
		.bail()
		.trim()
		.notEmpty()
		.withMessage("El nombre no puede ser vacío."),

	// Precio (Requerido, numérico, > 0, sanitización)
	body("price")
		.notEmpty()
		.withMessage("El precio es obligatorio.")
		.isNumeric()
		.withMessage("El precio debe ser un valor numérico.")
		// Usamos .isFloat con gt: 0 (mayor que 0)
		.isFloat({ gt: 0 })
		.withMessage("El precio debe ser mayor a 0.")
		.toFloat(), // Saneamiento: convierte el valor a float para el backend

	// Precio original (Opcional, numérico, > 0, sanitización)
	body("originalPrice")
		.optional()
		.isNumeric()
		.withMessage("El precio debe ser un valor numérico.")
		.isFloat({ gt: 0 })
		.withMessage("El precio debe ser mayor a 0.")
		.toFloat(),

	// Stock/Cantidad (entero, >= 0, sanitización)
	body("quantity") // Usamos 'stock' para el campo del backend
		.notEmpty()
		.withMessage("La cantidad (stock) es obligatoria.")
		.isInt({ min: 0 })
		.withMessage("La cantidad debe ser un número entero positivo o cero."),

	// Descripción (Requerido, min 10 caracteres, sanitización)
	body("description")
		.trim()
		.notEmpty()
		.withMessage("La descripción es obligatoria.")
		.isLength({ min: 10 })
		.withMessage("La descripción debe tener al menos 10 caracteres."),

	// Categoria (Requerido, no vacío, cadena)
	body("category")
		.trim()
		.notEmpty()
		.withMessage("La categoria es obligatoria."),

	// URL de la imagen (Requerido, no vacío, cadena)
	body("img_url")
		.trim()
		.notEmpty()
		.withMessage("La categoria es obligatoria."),

	//Evita inyección XSS básica
	body("name").blacklist("<>"),
	body("description").blacklist("<>"),
];

// Reglas para ACTUALIZAR un producto
export const updateProductValidationRules = [
	body("name")
		.optional()
		.isString()
		.withMessage("El nombre debe ser una cadena.")
		.bail()
		.trim()
		.notEmpty()
		.withMessage("El nombre no puede ser vacío."),
		
	body("price")
		.optional()
		.isNumeric()
		.withMessage("El precio debe ser un valor numérico.")
		.isFloat({ gt: 0 })
		.withMessage("El precio debe ser mayor a 0.")
		.toFloat(),

	body("originalPrice")
		.optional()
		.isNumeric()
		.withMessage("El precio debe ser un valor numérico.")
		.isFloat({ gt: 0 })
		.withMessage("El precio debe ser mayor a 0.")
		.toFloat(),

	body("quantity")
		.optional()
		.isInt({ min: 0 })
		.withMessage("La cantidad debe ser un número entero no negativo.")
		.toInt(),

	body("description")
		.optional()
		.trim()
		.notEmpty()
		.withMessage("La descripción no puede ser vacía.")
		.isLength({ min: 10 })
		.withMessage("La descripción debe tener al menos 10 caracteres."),

	body("category")
		.optional()
		.trim()
		.notEmpty()
		.withMessage("La categoria es obligatoria."),

	body("img_url")
		.optional()
		.trim()
		.notEmpty()
		.withMessage("La categoria es obligatoria."),

	// Saneamiento
	body("name").optional().blacklist("<>"),
	body("description").optional().blacklist("<>"),
];
