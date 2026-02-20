import express from 'express'
import { protectedRouter } from '../controllers/auth.js'
import { createTask, deleteTask, getMyTasks, updateTask } from '../controllers/tasks.js'
const route = express.Router()

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary:  Get all tasks for the logged-in user
 *     tags: []
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *        description: success
 */
route.get('/', protectedRouter, getMyTasks)


 /**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks for the logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, progress, completed]
 *               dueDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 */

route.post('/', protectedRouter, createTask)
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               dueDate:
 *                   type: string
 *     responses:
 *       200:
 *         description: Task updated
 */
route.put('/:id', protectedRouter , updateTask)
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 */
route.delete('/:id', protectedRouter , deleteTask)


export default route