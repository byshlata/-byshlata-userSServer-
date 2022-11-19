import express from "express";
import { Empty, ErrorResponseType, UserLoginType, UserResponseType } from "types";
import { ErrorMessage } from '../../enums/errorMessage'
import { Path } from '../../enums/path'
import { checkAuth } from "../../utils/checkAuth";
import { authUser } from "../repository";


const router = express.Router();

router.get<Empty, UserResponseType | ErrorResponseType, UserLoginType, Empty>(`${Path.Root}`, checkAuth, async (req, res) => {
    try {
        const user = await authUser(req.body.userId)

        if (user) {
            return res.status(200).send({ user })
        } else {
            return res.status(401).send({ message: ErrorMessage.Authorized })
        }
    } catch (error) {
        return res.status(401).send({ message: ErrorMessage.Authorized })
    }
});

module.exports = router
