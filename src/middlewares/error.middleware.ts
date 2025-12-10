import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/http.errors";

/**
 * Middleware para manejar todos los errores lanzados en la aplicación.
 */
export const errorHandler = (
	err: Error, // Captura el error lanzado (throw)
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//Manejo de Errores Personalizados (HttpError)
	if (err instanceof HttpError) {
		// Si es una de nuestras clases, usamos el statusCode y el mensaje definido
		return res.status(err.statusCode).json({
			status: err.statusCode,
			message: err.message,
		});
	}

	// Manejo de Errores 500 (Errores inesperados del servidor)
	console.error("Error interno inesperado:", err);
	return res.status(500).json({
		status: 500,
		message: "Error interno del servidor.",
	});
};
