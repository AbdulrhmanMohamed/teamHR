import { validator } from './../../middlewares/validate';
import { Roles } from './../../types/enums';
import { AuthenticationMiddleware } from './../../middlewares/auth';
import { Router, Response, Request, NextFunction } from "express"
import { checkRole } from '../../middlewares/acsses';
import { checkSubscripe } from '../../middlewares/subscription';
import { AuthuthrationMiddleware } from '../../middlewares/authuthration';
import { addCategory, getAllCategory, UpdateCategory, DeleteCategory, getCategoryById } from '../../controllers/category/category.controller';
const router: Router = Router();

// .all(AuthenticationMiddleware, AuthuthrationMiddleware('subCategory'), checkSubscripe, checkRole(Roles.ROOT))
router.route('/').post(addCategory)
router.route('/')
    .get(getAllCategory)

router.route('/:id').get(getCategoryById)

router.route('/:id').put(UpdateCategory)

router.route('/:id').delete(
    DeleteCategory
)


export default router;