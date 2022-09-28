import { Schema, model } from "mongoose";

interface IOrder {
    userID: string,
    userName: string,
    list: [{
        product_id: string,
        product_name: string,
        quantity: number
    }],
    date: string,
    address: string,
    phone: string,
    total: number
}

const orderSchema = new Schema<IOrder>({
    userID: String,
    userName: String,
    list: [{
        product_id: String,
        product_name: String,
        quantity: Number
    }],
    date: String,
    address: String,
    phone: String,
    total: Number
})

const OrderModel = model<IOrder>('Order', orderSchema);

export { OrderModel };

