import express from 'express';
import { emailController, registerUser } from '../controllers/emailController.js';

const router = express.Router();
/**
 * @swagger
 * /api/register
 * post:
 *  summary: Registrar usuario y enviar
 *  tags: [Email]
 *  requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          example:usuario1@gmailcom
 *                      name:
 *                          type: string
 *                          example: paquita la del barrio
 *  responses:
 *      200:
 *          descripcion: Email enviado correctamente
 * 
 *      500:
 *          descripcion: Error del servicio al enviar email
 */

router.post('/register', registerUser)

export default router;