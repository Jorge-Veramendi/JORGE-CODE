import express from 'express';
import { registerUser } from '../controllers/emailController.js';

const router = express.Router();

/**
 * @swagger
 * /api/email/register:
 *  post:
 *      summary: Registrar usuario nuevo
 *      tags: [Email]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: fazedesantin6@gmail.com
 *                          name:
 *                              type: string
 *                              example: yo
 *  responses:
 *      200:
 *          descripcion: Email enviado
 * 
 *      500:
 *          descripcion: Error del servicio
 */

router.post('/register', registerUser)

export default router;