const Project = require('../models/Project');
const { validationResult } = require('express-validator');

/**
 * Get Projects by user_id
 * 
 * @param req
 * @param res
 * @return response | json
 */
exports.list = async (req, res) => {
    try {

        const projects = await Project.find({ user_id: req.user.id }).sort({ created_at: -1 });
        res.json({ projects });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "An error has ocurred" });
    }
}

/**
 * Save a project
 * @param req
 * @param res
 * @return response | json
 */

exports.create = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {

        const project = new Project(req.body);
        project.user_id = req.user.id;

        await project.save();
        res.json({ msg: "Project Created successfully", project });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error has ocurred' });
    }
}


/**
 * Update a project by id
 * @param req
 * @param res
 * @return response | json
 */

exports.update = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body);
        if (project == null) return res.status(404).json({ msg: "Project not found" });
        res.json({ message: 'Project Updated successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "An error has ocurred" });
    }

}

/**
 * Delete a project by id
 * @param req
 * @param res
 * @return response | json
 */

exports.delete = async (req, res) => {

    try {

        const project = await Project.findByIdAndRemove(req.params.id);
        if (project == null) return res.status(404).json({ msg: "Project not found" });
        res.json({ message: 'Project deleted successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "An error has ocurred" });
    }
}