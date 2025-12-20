import { Product } from "./../types/product";
import * as productModel from "../models/product.model";
import { CreateProductDTO, UpdateProductDTO } from "../schemas/product.schema";

export const findAll = async (): Promise<Product[]> => {
	return productModel.findAll();
};

export const findById = async (id: string): Promise<Product> => {
	return productModel.findById(id);
};

export const create = async (product: CreateProductDTO): Promise<Product> => {
	return productModel.saveProduct(product);
};

export const updateById = async (id: string, updates: UpdateProductDTO): Promise<Product> => {
	return productModel.updateProduct(id, updates);
};

export const deleteById = async (id: string): Promise<void> => {
	productModel.deleteById(id);
};