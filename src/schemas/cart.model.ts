import { Schema, model } from "mongoose";

interface ICart {
    userEmail: string,
    list: []
}

const cartSchema = new Schema<ICart>({
    userEmail: String,
    list: []
})

const CartModel = model<ICart>('Cart', cartSchema);

export { CartModel };

