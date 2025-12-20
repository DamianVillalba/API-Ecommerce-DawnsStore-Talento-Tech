import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import { db } from "./config/firebase";
import { errorHandler } from "./middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "*"; // '*' como fallback seguro

//CORS Middleware (usando la variable de entorno)
const corsOptions = {
	origin: FRONTEND_URL,
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};

app.use(cors(corsOptions));

//Body Parser Middleware
app.use(express.json());

// Documentación Swagger
// URLs de los assets de Swagger
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";

app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, {
		customCss:
			".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
		customCssUrl: CSS_URL,
	})
);

app.get("/", (_req, res) => {
	res.redirect("/api-docs");
});

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);

//Middleware Routes
app.use((req: Request, res: Response, next: NextFunction) => {
	res.status(404).send("Recurso no encontraado o ruta invalida.");
});

//Middleware para manejar errores de logica de negocio y demas
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Servidor escuchando en puerto ${PORT}`);
});
