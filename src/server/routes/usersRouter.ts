import { deleteSomeUsers, getUsers, updateSomeUsers } from "../repository";
import express from "express";
import {
    Empty,
    ErrorResponseType,
    UserIdType,
    UsersResponseType,
    UsersUpdateType,
    UsersIdType
} from "types";
import { ErrorMessage } from '../../enums/errorMessage'
import { Path } from '../../enums/path'
import { checkAuth } from "../../utils/checkAuth";

import { Status } from "../../enums/status";

const router = express.Router();

router.get<Empty, UsersResponseType | ErrorResponseType, UserIdType, Empty>(`${Path.Root}`, checkAuth, async (req, res) => {
    try {
        const users = await getUsers()
        return res.status(200).send({ users })

    } catch (error) {
        res.status(400).send({ message: ErrorMessage.UserNotFound })
    }
});


router.delete<Empty, UsersResponseType | ErrorResponseType, UsersIdType, Empty >(`${Path.Root}`, checkAuth, async (req, res) => {
    try {

        const users = await deleteSomeUsers(req.body)

        if(req.body.id.indexOf(req.body.userId) !== -1) {
            return res.status(403).send({ message: ErrorMessage.DeleteUserInBase, auth: false })
        }
        return res.status(200).send({ users })

    } catch (error) {
        res.status(400).send({ message: ErrorMessage.DeleteUsers })
    }
});

router.post<Empty, UsersResponseType | ErrorResponseType, UsersUpdateType, Empty>(`${Path.Root}`, checkAuth, async (req, res) => {
    try {
        const users = await updateSomeUsers(req.body.id, req.body.data)

        if(req.body.id.indexOf(req.body.userId) !== -1 && req.body.data === Status.Block) {
            return res.status(403).send({ message: ErrorMessage.BlockUserInBase, auth: false })
        }

        return res.status(200).send({ users })
    } catch (error) {
        res.status(400).send({ message: ErrorMessage.UpdateUsers })
    }
});

module.exports = router
