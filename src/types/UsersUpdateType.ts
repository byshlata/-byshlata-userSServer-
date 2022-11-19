import { UsersIdType } from "types/UsersIdType";

export type UsersUpdateType = UsersIdType & {
    data: string
    userId?: string
}
