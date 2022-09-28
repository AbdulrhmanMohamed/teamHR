import { Schema, model } from "mongoose";

export interface PackageI{
    name_ar: string,
    name_en: string,
    duration: number,
    sale: number,
    maxCompaniesAllowed: number,
    maxEmployeesAllowed: number
}

const PackageSchema = new Schema<PackageI>({
    name_ar: String,
    name_en: String,
    duration: Number,
    sale: Number,
    maxCompaniesAllowed: Number,
    maxEmployeesAllowed: Number
}, {timestamps: true});

const Package = model<PackageI>('Package', PackageSchema);
export default Package;