import { Schema, model } from "mongoose";

interface IToken {
    email: string,
    token: number,
}

const tokenSchema = new Schema<IToken>({
    email: String,
    token: Number,
})

const TokenModel = model<IToken>('token', tokenSchema);

export { TokenModel };

