import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Dawn's Store API",
			version: "1.0.0",
			description:
				"Documentación de la API de E-commerce para Talento Tech",
		},
		servers: [
			{
				url: "https://api-ecommerce-dawns-store-talento-tech.vercel.app/api/v1",
				description: "Servidor de Producción (Vercel)",
			},
			{
				url: "http://localhost:3000/api/v1",
				description: "Servidor Local",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
			schemas: {
				LoginRequest: {
					type: "object",
					required: ["email", "password"],
					properties: {
						email: { type: "string", example: "test@admin.com" },
						password: { type: "string", example: "password123" },
					},
				},

				AuthResponse: {
					type: "object",
					properties: {
						token: { type: "string" },
					},
				},

				AuthErrorResponse: {
					type: "object",
					properties: {
						status: { type: "string" },
						message: {
							type: "string",
							example:
								"Credenciales inválidas (email o contraseña incorrectos).",
						},
					},
				},

				Product: {
					type: "object",
					properties: {
						id: { type: "string" },
						name: { type: "string" },
						price: { type: "number" },
						originalPrice: { type: "number" },
						quantity: { type: "integer" },
						description: { type: "string" },
						category: { type: "string" },
						img_url: { type: "string" },
					},
				},

				ProductCreateRequest: {
					type: "object",
					required: [
						"name",
						"price",
						"quantity",
						"description",
						"category",
						"img_url",
					],
					properties: {
						name: { type: "string" },
						price: { type: "number" },
						originalPrice: { type: "number" },
						quantity: { type: "integer" },
						description: { type: "string" },
						category: { type: "string" },
						img_url: { type: "string" },
					},
				},

				ProductUpdateRequest: {
					type: "object",
					minProperties: 1,
					properties: {
						name: { type: "string" },
						price: { type: "number" },
						originalPrice: { type: "number" },
						quantity: { type: "integer" },
						description: { type: "string" },
						category: { type: "string" },
						img_url: { type: "string" },
					},
				},

				ErrorResponse: {
					type: "object",
					properties: {
						error: { type: "string" },
						message: { type: "string" },
						errors: {
							type: "array",
							items: {
								type: "object",
								properties: {
									field: { type: "string" },
									message: { type: "string" },
								},
							},
						},
					},
				},
			},
		},
	},
	apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
