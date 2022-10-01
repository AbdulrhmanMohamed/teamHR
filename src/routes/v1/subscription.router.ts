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

const subscriptionsRouter = Router();

<<<<<<< HEAD
packageRouter.route('/').all(AuthenticationMiddleware,checkRole(Roles.SUPER_ADMIN))
=======
subscriptionsRouter.route('/').all(
    AuthenticationMiddleware,
    checkRole(Roles.SUPER_ADMIN))
>>>>>>> de4a296a6093b99a6508584db09e26a20b35a7a8
    .get(getAllsubscriptions)
    .post(
    validator(validatePackage, "post"),
    createSubscription);

subscriptionsRouter.route('/:id')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.SUPER_ADMIN, Roles.ROOT), getSubscriptionById)
    .put(checkRole(Roles.SUPER_ADMIN), validator(validatePackage, "put"), updateSubscription)
    .delete(checkRole(Roles.SUPER_ADMIN), deleteSubscription)
    .post(checkRole(Roles.SUPER_ADMIN, Roles.ROOT), activateSubscription)

subscriptionsRouter.route('/user/:id').post(
    AuthenticationMiddleware, 
    checkRole(Roles.SUPER_ADMIN, Roles.ROOT),
    buySubscription
    )

export default subscriptionsRouter;

