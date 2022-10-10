import { addDepartment, getAllDepartment, getDepartment, updateDepartment } from './../../controllers/depatement/department.controller';
import { getAllBranches, getBranch, updateBranch } from './../../controllers/branch/branch.controller';
import { validator } from './../../middlewares/validate';
import { Roles } from './../../types/enums';
import { AuthenticationMiddleware } from './../../middlewares/auth';
import { Router, Response, Request, NextFunction } from "express"
import { checkRole } from '../../middlewares/acsses';
import { validateBranch } from '../../validators/branch.validator';
import { addBranch } from '../../controllers/branch/branch.controller';
import { checkSubscripe } from '../../middlewares/subscription';
import { validateDepartment } from '../../models/Department';
import { AuthuthrationMiddleware } from '../../middlewares/authuthration';
const router: Router = Router()
router.route('/')
    .all(AuthenticationMiddleware, AuthuthrationMiddleware('departement'), checkSubscripe, checkRole(Roles.ROOT))
    .post(validator(validateDepartment, "post"), addDepartment)

router.route('/:company')
    .all(AuthenticationMiddleware, AuthuthrationMiddleware('departement'), checkSubscripe, checkRole(Roles.ROOT))
    .get(getAllDepartment)
router.route('/:company/:name')
    .all(AuthenticationMiddleware, AuthuthrationMiddleware('departement'), checkSubscripe, checkRole(Roles.ROOT))
    .get(getDepartment)
    .put(validator(validateDepartment, "put"), updateDepartment)
export default router