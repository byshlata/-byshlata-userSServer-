import { UserSendType } from "types";

export type UserType = UserSendType & {
    password: string,
}

