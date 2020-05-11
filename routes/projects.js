const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');
const requestValidation = require('../requests/projectRequest');
const authMiddleware = require('../middleware/auth');

/**
 * Get all projects
 * 
 * @model projects
 * @verbose GET
 * @route /api/projects
 */
router.get('/', authMiddleware, projectController.list);

/**
 * Save a project
 * 
 * @model projects
 * @verbose POST
 * @route /api/projects
 */
router.post('/', authMiddleware, requestValidation, projectController.create);

/**
 * Update a project by id
 * 
 * @model projects
 * @verbose PUT
 * @route /api/projects
 */
router.put('/:id', authMiddleware, requestValidation, projectController.update);

/**
 * Delete a project by id
 * 
 * @model projects
 * @verbose PUT
 * @route /api/projects
 */
router.delete('/:id', authMiddleware, requestValidation, projectController.delete);


module.exports = router;