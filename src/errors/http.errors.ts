/**
 * Clase base para todos los errores de la API que deben llevar un codigo de estado HTTP.
 */
export class HttpError extends Error {
	public statusCode: number;

	constructor(statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;
		// Asegura que la instancia sea de tipo HttpError
		Object.setPrototypeOf(this, HttpError.prototype);
	}
}

/**
 * Error 404 Not Found (Recurso no encontrado).
 */
export class NotFoundError extends HttpError {
	constructor(message: string = "Recurso no encontrado.") {
		super(404, message);
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}

/**
 * Error 400 Bad Request (Solicitud mal formada).
 */
export class BadRequestError extends HttpError {
	constructor(message: string = "La solicitud es inválida.") {
		super(400, message);
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
}

/**
 * Error 403 Forbidden (Acceso prohibido).
 */
export class ForbiddenError extends HttpError {
	constructor(message: string = "Acceso denegado.") {
		super(403, message);
		Object.setPrototypeOf(this, ForbiddenError.prototype);
	}
}


/**
 * Error 401 UnauthorizedError (Acceso denegado).
 */
export class UnauthorizedError extends HttpError {
	constructor(message: string = "Acceso denegado.") {
		super(401, message);
		Object.setPrototypeOf(this, UnauthorizedError.prototype);
	}
}