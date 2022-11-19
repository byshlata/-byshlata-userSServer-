import {
    Nullable,
    UserAuthType,
    UserLoginType,
    UserRegistrationType,
    UserSendType,
    UserType
} from "types";
import { User } from "../models/user";
import { createAuthUserData } from "../utils/createAuthUserData";
import { throwError } from "../utils/throwError"
import { createUsersData } from "../utils/createUsersData";
import { UsersIdType } from "types/UsersIdType";
import { createData } from "../utils/createData";

const bcrypt = require("bcrypt");

export const getUsers = async (): Promise<UserSendType[]> => {
    try {
        const users = await User.find()
        return users.map(user => createUsersData(user))
    } catch (error) {
        throwError()
    }
}

export const getUserByEmail = async (email: string): Promise<UserType> => {
    try {
        return await User.findOne({ email: new RegExp(email) });
    } catch (error) {
        throwError()
    }
}

export const getUserById = async (id: string): Promise<UserType> => {
    try {
        return await User.findById(id);
    } catch (error) {
        throwError()
    }
}

export const deleteSomeUsers = async (users: UsersIdType): Promise<UserSendType[]> => {
    try {
        await User.deleteMany({_id: {$in: users.id}})
        return await getUsers()
    } catch (error) {
        return throwError()
    }
}

export const updateUserData = async (id: string, updateData: {}): Promise<UserType> => {
    try {
        return await User.findByIdAndUpdate(id, updateData, { upsert: true });
    } catch (error) {
        throwError()
    }
}

export const updateSomeUsers = async (users: string[], data: string): Promise<UserSendType[]> => {
    try {
        await User.updateMany({_id: { $in: users}}, {$set: {status: data}} )
        return await getUsers()
    } catch (error) {
        return throwError()
    }
}

export const createUser = async (payload: UserRegistrationType): Promise<UserAuthType> => {
    try {
        const timeLastLogin = new Date();
        const status = 'active';
        const userNew = { ...payload, timeLastLogin, status };
        const salt = await bcrypt.genSalt(10);

        userNew.password = await bcrypt.hash(userNew.password, salt)

        const user = new User({ ...userNew });
        const creatingUser = await user.save();
        const userSend = createAuthUserData(creatingUser);
        return await userSend;

    } catch (error) {
        throwError()
    }
}


export const loginUser = async (payload: UserLoginType): Promise<UserAuthType> => {
    try {
        const user = await getUserByEmail(payload.email)
        if (user) {
            const isValidPassword = await bcrypt.compare(payload.password, user.password);
            if (isValidPassword) {
                const userUpdate = await updateUserData(user._id, { timeLastLogin: createData() })
                const userSend = createAuthUserData(userUpdate);
                return await userSend;
            } else {
                return throwError()
            }
        } else {
            return throwError()
        }
    } catch (error) {
        throwError()
    }
}

export const authUser = async (id: string): Promise<Nullable<UserAuthType>> => {
    try {
        const user = await getUserById(id)
        if (user) {
            const userSend = createAuthUserData(user);
            return await userSend;
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

