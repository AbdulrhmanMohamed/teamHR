
import { Response, Request, NextFunction, Router } from "express"
import { addCompany, getCompanyByName, getOwnerCompanies, updateCompanyByName } from "../../controllers/company/company.controller"
import { validator } from "../../middlewares/validate"
import { validateCompany } from "../../validators/company.validator"
const router = Router()
router.route('').all().post(validator(validateCompany), addCompany).get(getOwnerCompanies)
router.route('/:name').all().put(validator(validateCompany), updateCompanyByName).get(getCompanyByName)
export default router