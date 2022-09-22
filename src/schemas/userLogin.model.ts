import { Schema, model } from "mongoose";

interface IUser {
    name: string,
    email: string,
    password: string,
    role: BinaryData,
    google: {
        id: {type: string}
    }
}

const userSchema = new Schema<IUser>({
    name: String,
    email: String,
    password: String,
    role: Number,
    google: {
        id: String
    }
})

const UserModel = model<IUser>('User', userSchema);

export { UserModel };

