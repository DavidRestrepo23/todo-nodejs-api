const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const requestValidation = require('../requests/taskRequest');
const authMiddleware = require('../middleware/auth');

/**
 * list all task by proyect
 * 
 * @model tasks
 * @verbose GET
 * @route /api/tasks
 */
router.get('/:proyect_id', authMiddleware, taskController.list);

/**
 * Save a task
 * 
 * @model tasks
 * @verbose POST
 * @route /api/tasks
 */
router.post('/', authMiddleware, requestValidation, taskController.create);

/**
 * Update a task by id
 * 
 * @model tasks
 * @verbose PUT
 * @route /api/tasks
 */
router.put('/:id', authMiddleware, requestValidation, taskController.update);

/**
 * Delete a project by id
 * 
 * @model projects
 * @verbose PUT
 * @route /api/projects
 */
router.delete('/:id', authMiddleware, requestValidation, taskController.delete);

module.exports = router;