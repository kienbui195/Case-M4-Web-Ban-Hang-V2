import { Schema, model } from "mongoose";

interface IProduct {
    name: string,
    category: string,
    price: number,
    quantity: number,
    description: string,
    image: string
}

const productSchema = new Schema<IProduct>({
    name: String,
    category: String,
    price: Number,
    quantity: Number,
    description: String,
    image: String
})

const ProductModel = model<IProduct>('Product', productSchema);

export { ProductModel };

