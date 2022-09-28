import { Schema, model } from "mongoose";

interface IUser {
    name: string,
    email: string,
    password: string,
    role: string,
    isVerified: boolean,
    google_id: string,
    cartID: string
}

const userSchema = new Schema<IUser>({
    name: String,
    email: String,
    password: String,
    role: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    google_id: String,
    cartID: String
})

const UserModel = model<IUser>('User', userSchema);

export { UserModel };

