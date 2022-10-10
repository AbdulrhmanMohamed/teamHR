import { getAllBranches, getBranch, updateBranch } from './../../controllers/branch/branch.controller';
import { validator } from './../../middlewares/validate';
import { Roles } from './../../types/enums';
import { AuthenticationMiddleware } from './../../middlewares/auth';
import { Router, Response, Request, NextFunction } from "express"
import { checkRole } from '../../middlewares/acsses';
import { validateBranch } from '../../validators/branch.validator';
import { addBranch } from '../../controllers/branch/branch.controller';
import { checkSubscripe } from '../../middlewares/subscription';
import { AuthuthrationMiddleware } from '../../middlewares/authuthration';
const router: Router = Router()
router.route('/')
    .all(AuthenticationMiddleware, AuthuthrationMiddleware('branch'), checkSubscripe, checkRole(Roles.ROOT))
    .post(validator(validateBranch, "post"), addBranch)

router.route('/:company')
    .all(AuthenticationMiddleware, AuthuthrationMiddleware('branch'), checkSubscripe, checkRole(Roles.ROOT))
    .get(getAllBranches)
router.route('/:company/:name')
    .all(AuthenticationMiddleware, AuthuthrationMiddleware('branch'), checkSubscripe, checkRole(Roles.ROOT))
    .get(getBranch)
    .put(validator(validateBranch, "put"), updateBranch)
export default router