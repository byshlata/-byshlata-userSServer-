import { UserSendType } from "types";

export type UserAuthType = UserSendType & {
    token: string,
}
