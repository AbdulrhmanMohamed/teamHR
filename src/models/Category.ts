import mongoose, { Schema } from "mongoose";

export interface ICategory {
    categoryType: String
}

const categorySchema = new Schema<ICategory>({
    categoryType: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const Category = mongoose.model<ICategory>('Category', categorySchema)
export default Category;


