import { Product } from "./../types/product";
import * as productModel from "../models/product.model";

export const findAll = async (): Promise<Product[]> => {
	return productModel.findAll();
};

export const findById = async (id: string): Promise<Product> => {
	return productModel.findById(id);
};

export const create = async (product: Omit<Product, string>): Promise<Product> => {
	return productModel.saveProduct(product);
};

export const updateById = async (id: string, updates: Partial<Product>): Promise<Product> => {
	return productModel.updateProduct(id, updates);
};

export const deleteById = async (id: string): Promise<void> => {
	productModel.deleteById(id);
};