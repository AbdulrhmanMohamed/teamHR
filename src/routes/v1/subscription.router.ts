import { Router } from "express";
import { 
     activateSubscription,
     buySubscription,
     createSubscription,
     deleteSubscription,
     getAllsubscriptions, 
     getSubscriptionById, 
     updateSubscription
    } from "../../controllers/subscriptions";
import { checkRole } from "../../middlewares/acsses";
import { AuthenticationMiddleware } from "../../middlewares/auth";
import { validator } from "../../middlewares/validate";
import { Roles } from "../../types/enums";
import validatePackage from "../../validators/packageValidator";

const packageRouter = Router();

packageRouter.route('/').all(AuthenticationMiddleware,checkRole(Roles.SUPER_ADMIN))
    .get(getAllsubscriptions)
    .post(
    validator(validatePackage, "post"),
    createSubscription);

packageRouter.route('/:id')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.SUPER_ADMIN, Roles.ROOT), getSubscriptionById)
    .put(checkRole(Roles.SUPER_ADMIN), validator(validatePackage, "put"), updateSubscription)
    .delete(checkRole(Roles.SUPER_ADMIN), deleteSubscription)
    .post(checkRole(Roles.SUPER_ADMIN, Roles.ROOT), activateSubscription)

packageRouter.route('/user/:id').post(
    AuthenticationMiddleware, 
    checkRole(Roles.SUPER_ADMIN, Roles.ROOT),
    buySubscription
    )

export default packageRouter;

