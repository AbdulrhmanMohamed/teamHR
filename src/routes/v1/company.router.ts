
import { Response, Request, NextFunction, Router } from "express"
import { addCompany, getCompanyByName, getOwnerCompanies, updateCompanyByName } from "../../controllers/company/company.controller"
import { validator } from "../../middlewares/validate"
import { validateCompany } from "../../validators/company.validator"
const router = Router()
router.route('').all().post(validator(validateCompany, 'post'), addCompany).get(getOwnerCompanies)
router.route('/:name').all().put(validator(validateCompany, 'put'), updateCompanyByName).get(getCompanyByName)
export default router