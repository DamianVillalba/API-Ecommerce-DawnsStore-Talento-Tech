import jwt from 'jsonwebtoken';
import { ForbiddenError } from '../errors/http.errors';
import { generateToken } from '../utils/token-generator';
import { LoginCredentials } from '../types/user';

const JWT_SECRET_KEY = process.env;

if (!JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET no está definido.");
}

const HARDCODED_USER = {
    id: 'user-001-hardcode',
    email: 'test@admin.com',
    password: 'password123',
    firstName: 'Admin',
    lastName: 'Test',
};


export const login = async ({ email, password }: LoginCredentials): Promise<string> => {
    
    if (email !== HARDCODED_USER.email || password !== HARDCODED_USER.password) {
        throw new ForbiddenError('Credenciales inválidas (email o contraseña incorrectos).'); 
    }
    
    const userPayload = { id: HARDCODED_USER.id, email: HARDCODED_USER.email };
    return generateToken(userPayload);
};