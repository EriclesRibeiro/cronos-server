const db = require("../models");
const User = db.user;

exports.getUser = async (req, res) => {
    const { userId } = req.body;
    
    if (!userId) {
        return res.status(200).send({ success: false, message: "Os dados não foram informados!" });
    }
    if (userId.length < 12 || userId.length > 24){
        return res.status(200).send({ success: false, message: "Os dados informados são inválidos!" });
    }
    
    User.findById(userId, (err, data) => {
        if(err) {
            return res.status(200).send({ success: false, message: "Os dados informados são inválidos!" });
        }
        else {
            if (!data) {
                return res.status(200).send({ success: false, message: "Usuário não encontrado!" });
            } else {
                return res.status(200).send({ success: true, data: data });
            }
        }
    });
}

exports.getUser = async (req, res) => {
    const { userId } = req.query;
    
    if (!userId) {
        return res.status(200).send({ success: false, message: "Os dados não foram informados!" });
    }
    if (userId.length < 12 || userId.length > 24){
        return res.status(200).send({ success: false, message: "Os dados informados são inválidos!" });
    }
    
    User.findById(userId, (err, data) => {
        if(err) {
            return res.status(200).send({ success: false, message: "Os dados informados são inválidos!" });
        }
        else {
            if (!data) {
                return res.status(200).send({ success: false, message: "Usuário não encontrado!" });
            } else {
                return res.status(200).send({ success: true, data: data });
            }
        }
    });
}

exports.getUsers = async (req, res) => {
    
    User.find((err, data) => {
        if(err) {
            return res.status(200).send({ success: false, message: "Erro ao buscar usuários!" });
        }
        else {
            if (!data) {
                return res.status(200).send({ success: false, message: "Nenhum usuário registrado!" });
            } else {
                return res.status(200).send({ success: true, data: data });
            }
        }
    });
}

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
}

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
}

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
}

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
}