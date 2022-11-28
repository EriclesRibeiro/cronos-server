// const express = require('express');
// const router = express.Router();

// const authController = require('../controllers/auth.controller');

// router.post('/signin', authController.signin);
// router.post('/signup', authController.signup);
// router.put('/:id', authController.put);
// router.delete('/:id', authController.delete);

// module.exports = router;

const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post(
        "/api/auth/signup",
        [
          verifySignUp.checkDuplicateEmail,
          verifySignUp.checkRolesExisted
        ],
        controller.signup
      );

      app.post("/api/auth/signin", controller.signin);
      app.post("/api/auth/verifyEmail", controller.verifyEmail);
}