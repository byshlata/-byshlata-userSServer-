import { loginUser } from "../repository";
import express from "express";
import { Empty, ErrorResponseType, UserLoginType, UserResponseType } from "types";
import { ErrorMessage } from '../../enums/errorMessage'
import { Path } from '../../enums/path'
import { loginValidation } from '../../validation/authValidation'
import { validationResult } from 'express-validator'

const router = express.Router();

router.post<Empty, UserResponseType | ErrorResponseType, UserLoginType, Empty>(`${Path.Root}`, loginValidation, async (req, res) => {
    try {
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: ErrorMessage.CorrectEnter })
        }
        const email = req.body.email;
        const password = req.body.password;
        const user = await loginUser({ password, email })

        if (user.status === 'block') {
            return res.status(403).send({
                message: ErrorMessage.Block,
                auth: false
            })
        }

        return res.status(200).send({ user })
    } catch (error) {
        return res.status(400).send({ message: ErrorMessage.EmailOrPassword })
    }
});

module.exports = router
