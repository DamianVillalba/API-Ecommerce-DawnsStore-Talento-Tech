import { NextFunction, Request, Response } from "express";
import * as productService from "../services/product.service";
import { Product } from "../types/product";
import { BadRequestError } from "../errors/http.errors";

export const getAllProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const products = await productService.findAll();
		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};

export const getProductById = async (
	req: Request<{ id: string }>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const products = await productService.findById(id);
		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};

export const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const productData: Omit<Product, "id"> = req.body;
		const products = await productService.create(productData);
		res.status(201).json(products);
	} catch (error) {
		next(error);
	}
};

export const updateProduct = async (
	req: Request<{ id: string }>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const productData: Partial<Product> = req.body || {};
		if (Object.keys(productData).length === 0) {
			return next(
				new BadRequestError(
					"Debe enviar al menos un campo para actualizar el producto."
				)
			);
		}
		const products = await productService.updateById(id, productData);
		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};

export const deleteProduct = async (
	req: Request<{ id: string }>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const products = await productService.deleteById(id);
		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};
