import { NextFunction, Request, Response } from "express";
import * as productService from "../services/product.service";
import { Product } from "../types/product";
import { BadRequestError } from "../errors/http.errors";
import { CreateProductDTO, UpdateProductDTO } from "../schemas/product.schema";

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
		const dto = req.body as CreateProductDTO;
		const products = await productService.create(dto);
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
		const dto = req.body as UpdateProductDTO;
		const products = await productService.updateById(id, dto);
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
