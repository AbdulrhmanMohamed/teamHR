import { Router } from "express";
import { getAllAdmins, getAllEmployees, getAllRoots, getAllSuperAdmins } from "../../controllers/user/getAllUsers";
import { addUser } from "../../controllers/user/user.controller";
import { checkRole } from "../../middlewares/acsses";
import { AuthenticationMiddleware } from "../../middlewares/auth";
import { Roles } from "../../types/enums";
const userRouter = Router();

userRouter.route('/employees')
    .all(AuthenticationMiddleware, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .get(getAllEmployees);

userRouter.route('/superadmins')
    .all(AuthenticationMiddleware, checkRole(Roles.SUPER_ADMIN))
    .get(getAllSuperAdmins);

userRouter.route('/admins')
    .all(AuthenticationMiddleware, checkRole(Roles.ADMIN, Roles.ROOT))
    .get(getAllAdmins);;

userRouter.route('/roots')
    .all(AuthenticationMiddleware, checkRole(Roles.ADMIN, Roles.ROOT))
    .get(getAllRoots);

userRouter.post('/addUser', addUser)
export default userRouter