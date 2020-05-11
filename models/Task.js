const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false,
    },
    proyect_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Task", TaskSchema);