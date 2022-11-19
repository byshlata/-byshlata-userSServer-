import { createUser } from "../repository";
import express from "express";
import { Empty, ErrorResponseType, UserRegistrationType, UserResponseType } from "types";
import { Path } from "../../enums/path";
import { ErrorMessage } from "../../enums/errorMessage";
import { registerValidation } from '../../validation/authValidation'
import { validationResult } from 'express-validator'

const router = express.Router();

router.post<Empty, UserResponseType | ErrorResponseType, UserRegistrationType, Empty>(`${Path.Root}`, registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: ErrorMessage.CorrectEnter })
        }
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        const user = await createUser({ name, password, email })

        return res.status(200).send({ user })
    } catch (error) {
        return res.status(400).send({ message: ErrorMessage.EmailIsUse })
    }
});

module.exports = router
