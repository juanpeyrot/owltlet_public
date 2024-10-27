import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  publicId: string;
}

const CategorySchema: Schema = new Schema({
  publicId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
});

const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;