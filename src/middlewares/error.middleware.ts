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
    // Definir la respuesta base
    const responseBody: any = {
        status: 500,
        message: "Error interno del servidor.",
    };

    // Manejo de Errores Personalizados (HttpError)
    if (err instanceof HttpError) {
        responseBody.status = err.statusCode;
        responseBody.message = err.message;

        if (responseBody.status === 400 && (err as any).errors) {
            responseBody.errors = (err as any).errors;
        }

        return res.status(responseBody.status).json(responseBody);
    }

    // Manejo de Errores 500 (Errores inesperados del servidor)
    console.error("Error interno inesperado:", err);
    return res.status(500).json(responseBody);
};