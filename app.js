const express = require('express');
const router = express.Router();
const app = express();
const cors = require("cors");

const port = normalizaPort(process.env.PORT || '4000');
const dotenv = require('dotenv');

const db = require('./src/models');
const Role = db.role;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rotas
const index = require('./src/routes/index');
// const authRoutes = require('./src/routes/auth.routes');
require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);
require('./src/routes/project.routes')(app);


app.use('/api', index);

function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

app.use(cors());
app.use(express.json());
dotenv.config();

db.mongoose.connect(process.env.DATABASE_ACCESS).then(() => {
    app.listen(port, function() {
        console.log(`Successfully connect to MongoDB. Port: ${port}`);
        initial();
    });
}).catch((err) => {
    console.log("Error: ", err);
    process.exit();
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("addes 'user' to roles collection");
            });
            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("addes 'moderator' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("addes 'admin' to roles collection");
            });
        }
    });
}

// module.exports = app;