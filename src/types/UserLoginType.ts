import { UserIdType } from "types";

export type UserLoginType = UserIdType & {
    email: string,
    password: string,
}
