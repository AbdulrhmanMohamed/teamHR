import Joi from 'joi';
import { UserI } from '../models/User';
import { MartialStatusEnum, nationalities, Roles } from '../types/enums';

const validateUserPost = (user: any) => {
    const schema = Joi.object<UserI>({
        fullName_ar: Joi.string().min(3).max(50).pattern(/^[\u0621-\u064A ]+$/).required(),
        fullName_en: Joi.string().min(3).max(50).pattern(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/).required(),
        userName_ar: Joi.string().min(3).max(30).pattern(/^[\u0621-\u064A0-9 ]+$/).required(),
        userName_en: Joi.string().min(3).max(30).pattern(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/).required(),
        email: Joi.string().min(9).max(255).email().required(),
        password: Joi.string().min(5).max(255).required(),
        phone: Joi.string().min(7).max(15).pattern(/^[0-9]+$/).required(),
        company: Joi.when('role', {
            is: Joi.valid(Roles.EMPLOYEE, Roles.ADMIN),
            then: Joi.string().required()
        }),
        phone2: Joi.string().min(7).length(15).pattern(/^[0-9]+$/),
        nationalId: Joi.string().min(1).max(10),
        position: Joi.string().min(2).max(255),
        branch: Joi.string(),
        department: Joi.string(),
        nationality: Joi.string().min(5).max(255).valid(...nationalities),
        addresss: Joi.string().min(10).max(255),
        city: Joi.string().min(2).max(50),
        maritalStatus: Joi.string().min(4).max(50).valid(...Object.keys(MartialStatusEnum)),
        residencyExpiration: Joi.date().greater('now'),
        birthDate: Joi.string().isoDate(),
    });

    const result = schema.validate(user);
    return result;
}

const validateUserPut = (user: any) => {
    const schema = Joi.object<UserI>({
        fullName_ar: Joi.string().min(3).max(50).pattern(/^[\u0621-\u064A ]+$/),
        fullName_en: Joi.string().min(3).max(50).pattern(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/),
        userName_ar: Joi.string().min(3).max(30).pattern(/^[\u0621-\u064A0-9 ]+$/),
        userName_en: Joi.string().min(3).max(30).pattern(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/),
        email: Joi.string().min(9).max(255).email(),
        password: Joi.string().min(5).max(255),
        phone: Joi.string().min(7).max(15).pattern(/^[0-9]+$/),
        company: Joi.when('role', {
            is: Joi.valid(Roles.EMPLOYEE, Roles.ADMIN),
            then: Joi.string()
        }),
        phone2: Joi.string().min(7).length(15).pattern(/^[0-9]+$/),
        nationalId: Joi.string().min(1).max(10),
        position: Joi.string().min(2).max(255),
        branch: Joi.string(),
        department: Joi.string(),
        nationality: Joi.string().min(5).max(255).valid(...nationalities),
        addresss: Joi.string().min(10).max(255),
        city: Joi.string().min(2).max(50),
        maritalStatus: Joi.string().min(4).max(50).valid(...Object.keys(MartialStatusEnum)),
        residencyExpiration: Joi.date().greater('now'),
        birthDate: Joi.string().isoDate(),
    });

    const result = schema.validate(user);
    return result;
}

export  {validateUserPost, validateUserPut};