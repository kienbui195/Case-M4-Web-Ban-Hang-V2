import { Schema, model } from "mongoose";

interface IUser {
    name: string,
    email: string,
    password: string,
    google: {
        id: {type: string}
    },
    facebook: {
        id: {type: string}
    }
}

