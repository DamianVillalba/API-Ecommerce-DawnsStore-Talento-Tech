export class HttpError extends Error {
	public statusCode: number;

	constructor(statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;
		// Asegura que la instancia sea de tipo HttpError
		Object.setPrototypeOf(this, HttpError.prototype);
	}
}

export class NotFoundError extends HttpError {
	constructor(message: string = "Recurso no encontrado.") {
		super(404, message);
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}

export class BadRequestError extends HttpError {
	constructor(message: string = "La solicitud es inválida.") {
		super(400, message);
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
}

export class ForbiddenError extends HttpError {
	constructor(message: string = "Acceso denegado.") {
		super(403, message);
		Object.setPrototypeOf(this, ForbiddenError.prototype);
	}
}

export class UnauthorizedError extends HttpError {
	constructor(message: string = "Acceso denegado.") {
		super(401, message);
		Object.setPrototypeOf(this, UnauthorizedError.prototype);
	}
}

//CUSTOM
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