import { Schema, model } from "mongoose";

interface IOrder {
    name: string,
    list: [{
        product_id: string,
        quantity: number
    }],
}

const orderSchema = new Schema<IOrder>({
    name: String,
    list: [{
        product_id: String,
        quantity: Number
    }]
})

const OrderModel = model<IOrder>('Order', orderSchema);

export { OrderModel };

