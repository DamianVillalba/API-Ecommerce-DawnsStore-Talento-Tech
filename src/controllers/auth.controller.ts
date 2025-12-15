import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { BadRequestError } from '../errors/http.errors';
import { LoginCredentials, AuthTokenResponse } from '../types/user';


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as LoginCredentials;

        // Validación de datos de entrada básicos
        if (!email || !password) {
            throw new BadRequestError('Email y contraseña son obligatorios.');
        }

        const token = await authService.login({ email, password });

        const response: AuthTokenResponse = {
            message: 'Inicio de sesión exitoso.',
            token: token
        };

        res.status(200).json(response);

    } catch (error) {
        next(error);
    }
};