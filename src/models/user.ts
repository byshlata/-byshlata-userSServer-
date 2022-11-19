import { UserType } from "types";
import { model, Schema } from 'mongoose';


const userSchema = new Schema<UserType>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    timeLastLogin: { type: String, required: true },
    status: { type: String, required: true },
}, {
    timestamps: true
});

export const User = model<UserType>('User', userSchema);
