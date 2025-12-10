export interface Product {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	description: string;
	category: string;
	quantity: number;
	img_url: string;
}