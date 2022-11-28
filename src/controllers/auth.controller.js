// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const UserModel = require('../models/user.model');
// const mongoose = require('mongoose');

// const secret = process.env.SECRET;
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { get } = require("mongoose");

exports.signup = (req, res) => {
  const { email, password, categories, name } = req.body;
  const user = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 8),
    categories: categories,
    created_at: new Date(),
    updated_at: new Date()
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {

  const { email, password } = req.body;
  
  User.findOne({
    email: email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      
      const secret = process.env.SECRET;
      var token = jwt.sign({ id: user._id }, secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

exports.verifyEmail = (req, res) => {

  const { email } = req.body;
  
  User.findOne({
    email: email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err, emailExiste: false });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found.", emailExiste: false });
      }

      res.status(200).send({
        email: user.email,
        emailExiste: true
      });
    });
};

exports.refreshRoken = (req, res) => {}