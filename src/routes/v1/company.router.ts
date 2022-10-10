import { AuthenticationMiddleware } from './../../middlewares/auth';

import { Response, Request, NextFunction, Router } from "express"
import { addCompany, getCompanyByName, getOwnerCompanies, updateCompanyByName } from "../../controllers/company/company.controller"
import { validator } from "../../middlewares/validate"
import { validateCompany } from "../../validators/company.validator"
import { checkRole } from '../../middlewares/acsses';
import { Roles } from '../../types/enums';
import { checkSubscripe } from '../../middlewares/subscription';
import { AuthuthrationMiddleware } from '../../middlewares/authuthration';
const router = Router()
router.route('').all(AuthenticationMiddleware,checkSubscripe, checkRole(Roles.ROOT)).post(validator(validateCompany, "post"), addCompany).get(AuthuthrationMiddleware('company'),getOwnerCompanies)
router.route('/:name').all().put(AuthenticationMiddleware,AuthuthrationMiddleware('departement'),checkSubscripe, checkRole(Roles.ROOT),validator(validateCompany, "put"), updateCompanyByName).get(AuthenticationMiddleware, checkRole(Roles.ROOT,Roles.ADMIN),getCompanyByName)
export default router