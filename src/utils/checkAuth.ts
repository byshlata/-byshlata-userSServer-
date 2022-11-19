import { ErrorMessage } from "../enums";
import { Secret } from "../enums/secret"
import { authUser } from "../server/repository";
import { decipherToken } from "../utils/decipherToken";
import { sliceToken } from "../utils/sliceToken";


export const checkAuth = async (req, res, next) => {
    const token = sliceToken(req.headers.authorization)

    if (token) {
        try {
            const decodedToken = decipherToken(token, Secret.Secret)
            const user = await authUser(decodedToken)

            if (user && user.status === 'block') {
                return res.status(403).send({
                    message: ErrorMessage.Block,
                    auth: false
                })
            }

            if (!user) {
                return res.status(404).send({
                    message: ErrorMessage.UserNotFound,
                    auth: false
                })
            }

            req.body.userId = decodedToken;
            next();
        } catch (error) {
            return res.status(401).send({ message: ErrorMessage.Authorized })
        }
    } else {
        return res.status(401).send({ message: ErrorMessage.Authorized })
    }
}
