import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";
import { ValidationError } from "../errors/http.errors";

export const validate =
	(schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
		try {
			const parsed = schema.parse(req.body);
			req.body = parsed;
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = error.issues.map((issue) => ({
					field: issue.path.join("."),
					message: issue.message,
				}));

				return next(new ValidationError(errors));
			}

			next(error);
		}
	};
