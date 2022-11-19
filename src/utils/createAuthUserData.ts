import { Secret } from "../enums/secret";
import { UserAuthType, UserType } from "types";

const jwt = require('jsonwebtoken')

export const createAuthUserData = async (user: UserType): Promise<UserAuthType> => {
    const userInstance = JSON.parse(JSON.stringify(user))

    const token = jwt.sign({
        _id: userInstance._id,
    }, Secret.Secret, { expiresIn: '30d' })
    const { password, ...otherUserData } = userInstance

    return Promise.resolve({ token, ...otherUserData })

}
