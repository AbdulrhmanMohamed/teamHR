import { Router, Response, Request, NextFunction } from "express"
import { checkRole } from '../../middlewares/acsses';
import { validator } from "../../middlewares/validate";
import { checkSubscripe } from '../../middlewares/subscription';
import { AuthuthrationMiddleware } from '../../middlewares/authuthration';
import { AuthenticationMiddleware } from "../../middlewares/auth";
import { Roles } from "../../types/enums";
import { AddSubCategory, getSubCategory, updateSubCategory, deleteSubCategory, getAllSubCategories } from "../../controllers/subCategory/subCategory.controller";
// .all(AuthenticationMiddleware, AuthuthrationMiddleware('subCategory'), checkSubscripe, checkRole(Roles.ROOT))

const router: Router = Router();
router.route('/').post(AddSubCategory)

router.route('/').get(getAllSubCategories)


router.route('/:id').get(getSubCategory)

router.route('/:id').put(updateSubCategory)
router.route('/:id').delete(deleteSubCategory)
// router.route('/:id').put(validator(validateSubCategory, 'put'), updateSubCategory)

// router.route('/:id').delete(deleteSubCategory)

export default router;