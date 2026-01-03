import mongoose, { Document, Schema, models } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  iconName: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  iconName: { type: String, required: true },
});

const CategoryModel = models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default CategoryModel;
