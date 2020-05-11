const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

/**
 * Get Tasks by proyect_id
 * 
 * @param req
 * @param res
 * @return response | json
 */

exports.list = async (req, res) => {

    const { proyect_id } = req.params;

    try {

        const proyect = await Project.findById(proyect_id);
        if (!proyect) return res.status(404).json({ msg: "Project not found" });

        if (proyect.user_id.toString() !== req.user.id) return res.status(401).json({
            msg: "Permission denied, unauthorized user"
        });

        const tasks = await Task.find({ proyect_id });
        res.json({ tasks });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "An error has ocurred" });
    }
}



/**
 * Save a task
 * @param req
 * @param res
 * @return response | json
 */

exports.create = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { proyect_id } = req.body;

    try {

        const proyect = await Project.findById(proyect_id);
        if (!proyect) return res.status(404).json({ msg: "Project not found" });

        if (proyect.user_id.toString() !== req.user.id) return res.status(401).json({
            msg: "Permission denied, unauthorized user"
        });

        const task = new Task(req.body);
        await task.save();
        res.json({ msg: "Task Created successfully", task });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "An error has ocurred" });
    }

}

/**
 * Update a task by id
 * @param req
 * @param res
 * @return response | json
 */

exports.update = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body);
        if (task == null) return res.status(404).json({ msg: "Task not found" });
        res.json({ message: 'Task Updated successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "An error has ocurred" });
    }

}

/**
 * Delete a task by id
 * @param req
 * @param res
 * @return response | json
 */

exports.delete = async (req, res) => {

    try {
        const task = await Task.findByIdAndRemove(req.params.id);
        if (task == null) return res.status(404).json({ msg: "Task not found" });
        res.json({ message: 'Task deleted successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "An error has ocurred" });
    }
}