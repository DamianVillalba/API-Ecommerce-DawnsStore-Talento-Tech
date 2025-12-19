import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/http.errors";

/**
 * Middleware para manejar todos los errores lanzados en la aplicación.
 */
export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// JSON inválido
	if (
		err instanceof SyntaxError &&
		(err as any).type === "entity.parse.failed"
	) {
		return res.status(400).json({
			message: "El cuerpo de la request no es un JSON válido.",
		});
	}

	// Errores de negocio
	if (err instanceof HttpError) {
		const response: any = {
			message: err.message,
		};

		if ("errors" in err) {
			response.errors = err.errors;
		}

		return res.status(err.statusCode).json(response);
	}

	// Errores inesperados
	if (process.env.NODE_ENV !== "production") {
		console.error(err);
	}

	return res.status(500).json({
		message: "Error interno del servidor.",
	});
};
