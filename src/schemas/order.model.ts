import { Schema, model } from "mongoose";

interface IOrder {
    userID: string,
    list: [{
        product_id: string,
        quantity: number
    }],
    date: string,
    address: string,
    phone: string,
    total: number
}

const orderSchema = new Schema<IOrder>({
    userID: String,
    list: [{
        product_id: String,
        quantity: Number
    }],
    date: String,
    address: String,
    phone: String,
    total: Number
})

const OrderModel = model<IOrder>('Order', orderSchema);

export { OrderModel };

