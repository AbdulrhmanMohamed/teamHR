import { Response, NextFunction } from "express";
import { AuthenticatedReq } from "../../middlewares/auth";
import SubCategory from "../../models/SubCategory";


export const AddSubCategory = async (req: AuthenticatedReq, res: Response) => {

    let { subType, haveTime, category } = req.body;
    subType = subType.toLowerCase().replace(/\s+/g, " ").trim()
    // check if the subCategory Exist 
    const isSubCategExist = await SubCategory.findOne({ subType })
    if (isSubCategExist)
        return res.status(400).send({ error_en: 'Sub Category Already Exist' })
    // create new Sub Category
    const newSubCategory = new SubCategory({
        subType,
        haveTime,
        category
    })

    await newSubCategory.save();
    res.status(200).send({ message_en: 'SubCategory Added Succesfuly', subCategory: newSubCategory })

}

export const getSubCategory = async (req: AuthenticatedReq, res: Response) => {
    const subCategoryId = req.params.id;


    const subCategory = await SubCategory.findById(subCategoryId).populate('category')
    res.status(200).send({ message: 'SubCategory Fetched Succesfuly', subCategory })


}

export const getAllSubCategories = async (req: AuthenticatedReq, res: Response) => {

    // get The Category that relate to that sub Category


    const subCategories = await SubCategory.find().populate('category');
    if (subCategories.length == 0)
        return res.status(400).send({ message_en: 'SubCategories Not Found' })
    res.status(200).send({ message: 'SubCategories Fetched Succesfuly', subCategories })

}

export const updateSubCategory = async (req: AuthenticatedReq, res: Response) => {
    let { subType, haveTime, category } = req.body;
    subType = subType.toLowerCase().replace(/\s+/g, " ").trim()
    const subCategoryId = req.params.id;
    // check if The subCategory Exist 
    const isSubCategExist = await SubCategory.findById(subCategoryId);
    if (!isSubCategExist)
        return res.status(400).send({ error_en: 'SubCategory Not Found' })
    // update the sub Category

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(subCategoryId, { subType, haveTime, category }, { returnOriginal: false }).populate('category')
    res.status(200).send({ message_en: 'Sub Category Updated Succesfuly', subCategory: updatedSubCategory })



}


export const deleteSubCategory = async (req: AuthenticatedReq, res: Response) => {
    // get id of the sub Category
    const subCategoryId = req.params.id;
    // check if the subCategory exist or not 
    const isSubCategoryExist = await SubCategory.findById(subCategoryId)
    if (!isSubCategoryExist)
        return res.status(400).send({ error_en: 'Sub Category Not Found' })
    // delete the desired SubCategory

    const subCategoryDeleted = await SubCategory.findByIdAndDelete(subCategoryId)
    console.log('deletedSub Category : ', subCategoryDeleted)
    res.status(200).send({ message_en: 'sub Category Deleted Succesfuly' })



}