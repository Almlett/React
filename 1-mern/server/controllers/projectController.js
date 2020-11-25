const Project = require('../models/Projects.js');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty ()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const project = new Project(req.body);
        project.creator = req.user.id;
        project.save();
        res.json(project);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error")
    }
}

// get all projects from user

exports.getProjects = async (req,res) => {
    try {
        const projects = await Project.find({ creator: req.user.id }).sort({create_at: -1})
        res.json({projects})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error")
    }
}

// update project

exports.updateProject = async (req, res) => {
    const errors = validationResult(req);
    if( !errors.isEmpty ()){
        return res.status(400).json({errors: errors.array()});
    }

    const { name } = req.body;
    const newProject = {};
    
    if (name){
        newProject.name = name
    }
        
    try {
        let project = await Project.findById(req.params.id);
        if (!project){
            return res.status(404).json({msg:"project not found"})
        }

        if (project.creator.toString() !== req.user.id){
            return res.status(401).json({msg:"No authorized"})
        }

        project = await Project.findByIdAndUpdate({ _id: req.params.id }, {$set: newProject}, { new: true})

        res.json(project)

    } catch (error) {
        console.log(error)
        res.status(500).send("Error")
    }
}

exports.deleteProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project){
            return res.status(404).json({msg:"project not found"})
        }

        if (project.creator.toString() !== req.user.id){
            return res.status(401).json({msg:"No authorized"})
        }

        await Project.findOneAndRemove({ _id: req.params.id });
        res.json({msg: "Project deleted"})


    } catch (error) {
        console.log(error)
        res.status(500).send("Error")
    }
}