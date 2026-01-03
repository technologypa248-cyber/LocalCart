import mongoose, { Document, Schema, Types, models } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  category: Types.ObjectId;
  imageUrl: string;
  imageHint: string;
  isVisible: boolean;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  imageUrl: { type: String, required: true },
  imageHint: { type: String, required: false },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

const ProductModel = models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default ProductModel;
