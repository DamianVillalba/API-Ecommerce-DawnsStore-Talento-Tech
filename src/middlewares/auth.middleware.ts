import type { Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { UnauthorizedError } from "../errors/http.errors";
import { AuthRequest, JwtUserPayload } from "../types/user";

const { JWT_SECRET_KEY } = process.env;

if (!JWT_SECRET_KEY) {
	throw new Error(
		"JWT_SECRET no está definido en las variables de entorno (.env)."
	);
}

export const verifyToken = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return next(
			new UnauthorizedError(
				"Acceso denegado. Encabezado de autorización ausente."
			)
		);
	}

	const [scheme, token] = authHeader.split(" ");

	if (scheme?.toLowerCase() !== "bearer" || !token) {
		return next(
			new UnauthorizedError(
				"Acceso denegado. Se requiere un token Bearer válido."
			)
		);
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtUserPayload;

		// validaciones extra por si cambió el payload del token
		if (!decoded.id || !decoded.email) {
			return next(
				new UnauthorizedError(
					"Token inválido. Faltan datos del usuario."
				)
			);
		}

		req.user = decoded;
		return next();
	} catch (error) {
		// Diferenciar token expirado de token inválido
		if (error instanceof TokenExpiredError) {
			return next(
				new UnauthorizedError(
					"Token expirado. Por favor, inicia sesión nuevamente."
				)
			);
		}

		return next(new UnauthorizedError("Token inválido."));
	}
};
