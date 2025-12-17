# 🏪 Dawn's Store API

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://api-ecommerce-dawns-store-talento-t.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

API REST desarrollada para la **gestión de productos y autenticación de usuarios** en un contexto e‑commerce. El proyecto está orientado a **buenas prácticas backend**, con foco en **arquitectura limpia, escalabilidad, seguridad y mantenibilidad**.

> Proyecto final desarrollado en el marco de **Talento Tech**.

---

## 📌 Características Principales

- Arquitectura en capas con **separación clara de responsabilidades**
- Autenticación segura mediante **JWT (Bearer Token)**
- Persistencia de datos en **Firebase Firestore**
- Manejo centralizado de errores y estados HTTP
- Código tipado y mantenible con **TypeScript**
- Deploy continuo en **Vercel**

---

## 🏗️ Arquitectura del Proyecto

La aplicación sigue un enfoque de **Clean Architecture / Layered Architecture**:

```
src/
├── routes/        # Definición de endpoints
├── controllers/   # Manejo de req / res
├── services/      # Lógica de negocio
├── models/        # Modelos y contratos de datos
├── middlewares/   # Autenticación, validaciones y errores
├── config/        # Configuración (Firebase, env, etc.)
└── index.ts       # Punto de entrada de la aplicación
```

**Responsabilidades:**
- **Routes** → Exponen la API
- **Controllers** → Orquestan la petición
- **Services** → Contienen la lógica de negocio
- **Models** → Definen la estructura de datos
- **Middlewares** → Seguridad, validaciones y manejo de errores

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|---------|-----|
| **Node.js** | Entorno de ejecución |
| **Express.js** | Framework para API REST |
| **TypeScript** | Tipado estático y robustez |
| **Firebase Firestore** | Base de datos NoSQL |
| **JWT** | Autenticación y autorización |
| **Vercel** | Hosting y CI/CD |

---

## 🚀 Instalación y Configuración Local

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/DamianVillalba/API-Ecommerce-DawnsStore-Talento-Tech.git
cd API-Ecommerce-DawnsStore-Talento-Tech
npm install
```

---

### 2️⃣ Variables de Entorno

Crear un archivo **`.env`** en la raíz del proyecto:

```bash
# JWT
JWT_SECRET_KEY=tu_clave_secreta

# Firebase SDK
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_auth_domain
FIREBASE_STORAGE_BUCKET=tu_storage_bucket
FIREBASE_APP_ID=tu_app_id
```

---

### 3️⃣ Ejecución del Proyecto

```bash
# Modo desarrollo
npm run dev

# Build
npm run build

# Producción
npm start
```

---

## 🛣️ API Endpoints

### 🔐 Autenticación

| Método | Endpoint | Descripción |
|------|---------|------------|
| POST | `/api/v1/auth/login` | Inicia sesión y devuelve un **Bearer Token** |

---

### 📦 Productos

| Método | Endpoint | Protegido | Descripción |
|------|---------|-----------|------------|
| GET | `/api/v1/product` | ❌ | Obtiene todos los productos |
| GET | `/api/v1/product/:id` | ❌ | Obtiene un producto por ID |
| POST | `/api/v1/product` | ✅ | Crea un nuevo producto |
| DELETE | `/api/v1/product/:id` | ✅ | Elimina un producto |

#### 🔑 Autorización

Para rutas protegidas incluir el header:

```
Authorization: Bearer <tu_token>
```

---

## 🛡️ Seguridad y Manejo de Errores

- **JWT Middleware** para validación de acceso
- **CORS** configurado para Frontend
- Manejo consistente de **errores y códigos HTTP**
- Validaciones previas a la ejecución de la lógica de negocio

---

## 🔗 Enlaces Útiles

- 🚀 **Deploy Producción:** https://api-ecommerce-dawns-store-talento-t.vercel.app/
- 💻 **Repositorio GitHub:** https://github.com/DamianVillalba

---

## ✨ Autor

Desarrollado por **Damian Villalba**  
Backend Developer · Java / Node.js · Clean Architecture

---

📬 *Feedback y sugerencias son bienvenidos.*
