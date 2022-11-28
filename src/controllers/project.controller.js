const db = require("../models");
const project = db.project;
const User = db.user;

exports.createProject = (req, res) => {
    const { 
        name, 
        description, 
        type, 
        userId, 
        identifier, 
        members, 
        categorie,
        repositorie
    } = req.body;

    if(!name) {
        return res.status(200).send({ success: false, response: "Nome do projeto não informados!" });
    }
    if(!type) {
        return res.status(200).send({ success: false, response: "Tipo de projeto não informado!" });
    }
    if(!userId) {
        return res.status(200).send({ success: false, response: "Responsável pelo projeto não informado!" });
    }
    if(userId.length < 12 || userId.length > 24) {
        return res.status(200).send({ success: false, response: "Os dados informados são inválidos!" });
    }
    if(!members) {
        members = [];
    }

    var currentdate = new Date().toString().split(" (")[0];

    var jsonBody = {
        name: name, 
        owner: userId,
        description: description, 
        members: [...members, userId],
        private: type, 
        created_at: currentdate,
        updated_at: currentdate,
        identifier: identifier,
        categorie: categorie,
        repositorie: repositorie
    }

    const newProject = new project(jsonBody);

    try {
        newProject.save();
        return res.status(201).send({ success: true, response: 'Projeto criado com sucesso!' });
    } catch (error) {
        return res.status(500).send({ success: false, response: 'Ocorreu um erro no servidor, tente novamente mais tarde!' });
    }
}