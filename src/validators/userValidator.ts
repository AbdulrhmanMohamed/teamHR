import Joi from 'joi';
import { UserI } from '../models/User';
import { MartialStatusEnum, nationalities, Roles } from '../types/enums';

const validateUser = (user: any) => {
    const schema = Joi.object<UserI>({
        fullName_ar: Joi.string().min(3).max(50).pattern(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/).alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.forbidden(),
        }),
        fullName_en: Joi.string().min(3).max(50).pattern(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/).alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.forbidden(),
        }),
        userName_ar: Joi.string().min(3).max(30).pattern(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/).alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.forbidden(),
        }),
        userName_en: Joi.string().min(3).max(30).pattern(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/).alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.forbidden(),
        }),
        email: Joi.string().min(9).max(255).email().alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.forbidden(),
        }),
        password: Joi.string().min(5).max(255).alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.forbidden(),
        }),
        phone: Joi.string().min(7).max(15).pattern(/^[0-9]+$/).alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.forbidden(),
        }),
        company: Joi.when('role', {
            is: Joi.valid(Roles.EMPLOYEE, Roles.ADMIN),
            then: Joi.string().alter({
                post: (schema) => schema.required(),
                put: (schema) => schema.forbidden(),
            })
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

export default validateUser;