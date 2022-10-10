import { AuthenticationMiddleware } from "../../middlewares/auth";
import { AuthuthrationMiddleware } from "../../middlewares/authuthration";
import { checkRole } from "../../middlewares/acsses";
import { Router } from "express";
import { Roles } from "../../types/enums";
import { validator } from "../../middlewares/validate";
import { validateRequest } from "../../models/Request";
import { addRequest, getAllRequests, getRequestById, updateRequest, deleteRequest } from "../../controllers/request/request.controller";
const router: Router = Router();
// all(AuthenticationMiddleware, AuthuthrationMiddleware('request'), checkRole(Roles.ROOT), validator())

// create Request 
router.route('/').post(validator(validateRequest, 'post'), addRequest)
//GetAll
router.route('/').get(getAllRequests)
//Get By Id
router.route('/:id').get(getRequestById)
//update
router.route('/:id').put(updateRequest)
//delete Request
router.route('/:id').delete(deleteRequest)

export default router;