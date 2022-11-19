import { connect } from 'mongoose';
import { Path } from "../enums/path";
const express = require('express')
const cors = require('cors')
const register = require('./routes/registerRouter')
const login = require('./routes/loginRouter')
const users = require('./routes/usersRouter')
const authMe = require('./routes/authRouter')
const { config } = require('dotenv')

config()

async function run() {
    await connect(process.env.DB_HOST);
}

run().catch(err => console.log(err));

const app = express();

process.on('unhandledRejection', (reason, p) => {
    console.log(reason, p)
})

const corsOptions = {
    origin: 'https://byshlata.github.io/TableUsers',
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(`${Path.Register}`, register)
app.use(`${Path.Login}`, login)
app.use(`${Path.Users}`, users)
app.use(`${Path.Auth}`, authMe)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

