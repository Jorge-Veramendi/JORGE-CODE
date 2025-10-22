import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  example: 1
 *              email:
 *                  type: string
 *                  example: jorgeveramendi@gmacil.com
 *              name:
 *                  type: string
 *                  example: Jorge
 *      
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *      sumamary: Obtener todos los usuarios
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: Ok
 */
router.get("/", userController.getUsers);

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: Crear nuevo usuario
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: jorgeveramendi@gmail.com   
 *                          name:
 *                              type: string
 *                              example: Jorge
 *      responses:
 *          201:
 *              description: Usuario creado correctamente
 *              content:
 *                  application/json:
 *                      $ref: '#/components/schemas/User'
 *          400:
 *              description: Datos invalidos
 *          500: 
 *              description: Error del servidor
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: jorgeveramendi.com
 *               name:
 *                 type: string
 *                 example: Jorge
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: Usuario actualizado correctamente
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', userController.updateUser);


router.post("/", userController.createUser);

/**
 * 
 */

//Rutas para llamar al usuario
router.get('/',userController.getUsers);
router.post('/',userController.createUser);
router.put('/:id',userController.updateUser);

//metodo para eliminar DELETE
//metodo para actualizar PUT
//metodo para modificar PATCH

export default router;
