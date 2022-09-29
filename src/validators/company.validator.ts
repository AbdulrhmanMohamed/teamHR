import Joi from "joi"
export function validateCompany(company: any) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255),
        admin: Joi.objectId()
    });
    const result = schema.validate(company);
    return result;
}
export function validateAddCompany(woner: String, companies: Array<any>) {
    
}