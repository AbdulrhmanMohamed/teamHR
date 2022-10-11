import mongoose, { Schema } from 'mongoose'
import Joi from 'joi'
import { IRequest } from './Request';
interface ISubCategory {
    subType: String,
    haveTime: Boolean,
    category: mongoose.Schema.Types.ObjectId,
}

const subCategorySchema = new Schema<ISubCategory>(
    {
        subType: {
            type: String,
            required: true,
        },
        haveTime: {
            type: Boolean,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }

    }
)

const SubCategory = mongoose.model<ISubCategory>('SubCategory', subCategorySchema)
export default SubCategory;



export function validateSubCategory(subCategory: ISubCategory) {

    // check the truthness of have time 
    // const haveTime = subCategory.haveTime;
    const schema = Joi.object({
        subType: Joi.string().required(),
        haveTime: Joi.boolean().required(),
        category: Joi.objectId().required()
    })
    return schema.validate(subCategory)
}