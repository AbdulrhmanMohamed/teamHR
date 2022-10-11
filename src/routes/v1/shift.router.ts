import { addShift, getAllShifts, getShift, addHolidays, addWorkDays } from './../../controllers/shifts/shift.controller';
import { validator } from './../../middlewares/validate';
import { Roles } from './../../types/enums';
import { AuthenticationMiddleware } from './../../middlewares/auth';
import { Router, Response, Request, NextFunction } from "express"
import { checkRole } from '../../middlewares/acsses';
import { checkSubscripe } from '../../middlewares/subscription';
import { validateShift } from '../../validators/shift.validators';
import { AuthuthrationMiddleware } from '../../middlewares/authuthration';
const router: Router = Router()
router.route('')
    .all(AuthenticationMiddleware, AuthuthrationMiddleware("shift"), checkSubscripe, checkRole(Roles.ROOT, Roles.ADMIN))
    .post(validator(validateShift, "post"), addShift)
router.route('/:branch')
    .all(AuthenticationMiddleware, AuthuthrationMiddleware("shift"), checkSubscripe, checkRole(Roles.ROOT, Roles.ADMIN))
    .get(getAllShifts)
router.route('/:branch/:name')
    .all(AuthenticationMiddleware, AuthuthrationMiddleware("shift"), checkSubscripe, checkRole(Roles.ROOT, Roles.ADMIN))
    .get(getShift).put(validator(validateShift, "put"))
router.route('holidays/:branch/:name')
    .all(AuthenticationMiddleware, AuthuthrationMiddleware("shift"), checkSubscripe, checkRole(Roles.ROOT, Roles.ADMIN))
    .post(addHolidays)
router.route('workdays/:branch/:name')
    .all(AuthenticationMiddleware, AuthuthrationMiddleware("shift"), checkSubscripe, checkRole(Roles.ROOT, Roles.ADMIN))
    .post(addWorkDays)
export default router 