const mongoose = require('mongoose');

const Project = mongoose.model("Project", 
    new mongoose.Schema({
        name: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        description: String,
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        private: Boolean,
        created_at: String,
        updated_at: String,
        identifier: String,
        categorie: String,
        repositorie: String
    })
);

module.exports = Project;