import mongoose, { ObjectId, Schema, model, Model, Document } from 'mongoose';
import {  MartialStatusEnum, Roles } from '../types/enums';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export interface UserI extends Document {
    fullName_ar: string,
    fullName_en: string,
    userName_ar: string,
    userName_en: string,
    nationalId: string,
    position: string,
    email: string,
    password: string,
    role: Roles,
    residencyExpiration: Date,
    nationality: string,
    phone: string,
    phone2: string,
    addresss: string,
    city: string,
    birthDate: Date,
    maritalStatus: MartialStatusEnum,
    department: ObjectId,
    company: ObjectId,
    branch: ObjectId,
    createToken: () => string,
    isPasswordsMatched: (enteredPassword: string) => Promise<boolean>
}

const UserSchema = new Schema<UserI, Model<UserI>>({
    fullName_ar: String,
    fullName_en: String,
    userName_ar: String,
    userName_en: String,
    nationalId: String,
    position: String,
    email: String,
    password: String,
    role: String,
    residencyExpiration: Date,
    nationality: String,
    phone: String,
    phone2: String,
    addresss: String,
    city: String,
    birthDate: Date,
    maritalStatus: String,
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departments'
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branches'
    },
}, { timestamps: true });

// Hash password
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  });
  
//   Check if passwords are mathced

UserSchema.methods.isPasswordMatched = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
UserSchema.methods.createToken = function () {
    return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_KEY!, {
      expiresIn: +process.env.JWT_AGE! / 1000,
    });
  };
const User = model<UserI>('User', UserSchema);

export default User;


