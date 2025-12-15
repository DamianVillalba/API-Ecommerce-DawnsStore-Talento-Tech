import { Product } from "./../types/product";
import { NotFoundError } from "../errors/http.errors";
import { db } from "../config/firebase";
import {
	collection,
	getDocs,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	query,
	where,
} from "firebase/firestore";

const productCollection = collection(db, "products");

export const findAll = async (): Promise<Product[]> => {
	const querySnapshot = await getDocs(productCollection);

	// Mapear los documentos de Firestore a objetos TypeScript
	const products: Product[] = querySnapshot.docs.map(
		(doc) =>
			({
				id: doc.id,
				...doc.data(),
			} as Product)
	);

	return products;
};

export const findById = async (id: string): Promise<Product> => {
	const productDoc = await getDoc(doc(productCollection, id));

	if (!productDoc.exists()) {
		throw new NotFoundError(`Producto con id ${id} no existe`);
	}

	return {
		id: productDoc.id,
		...productDoc.data(),
	} as Product;
};

export const saveProduct = async (
	product: Omit<Product, string>
): Promise<Product> => {
	const newDocRef = await addDoc(productCollection, product);
	return {
        id: newDocRef.id,
        ...product,
    } as Product;
};

export const updateProduct = async (
	id: string,
	updates: Partial<Product>
): Promise<Product> => {
	// Corroboro si existe producto con el findById
	const existingProduct = await findById(id);
	await updateDoc(doc(productCollection, id), updates);
	// Devuelvo el objeto completo actualizado
	return { ...existingProduct, ...updates } as Product;
};

export const deleteById = async (id: string): Promise<void> => {
	await deleteDoc(doc(productCollection, id));
};
