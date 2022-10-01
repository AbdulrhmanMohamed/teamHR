import { Router } from "express";
import { createSuperAdmin } from "../../controllers/user/createUser";
import { getAllAdmins, getAllEmployees, getAllRoots, getAllSuperAdmins } from "../../controllers/user/getAllUsers";
import { getAdmin, getEmployee, getRoot } from "../../controllers/user/getUserById";
import { checkRole } from "../../middlewares/acsses";
import { AuthenticationMiddleware } from "../../middlewares/auth";
import { validator } from "../../middlewares/validate";
import { Roles } from "../../types/enums";
import validateUser from "../../validators/userValidator";
const userRouter = Router();

userRouter.route('/employees')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getAllEmployees);
    

userRouter.route('/employees/:id')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getEmployee);

userRouter.route('/superadmins')
    .all(AuthenticationMiddleware, checkRole(Roles.SUPER_ADMIN))
    .get(getAllSuperAdmins)
    .post(validator(validateUser, "post"), createSuperAdmin);

userRouter.route('/superadmins/:id')
    .all(AuthenticationMiddleware, checkRole(Roles.SUPER_ADMIN))
    .get(getEmployee);

userRouter.route('/admins')
    .all(AuthenticationMiddleware, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .get(getAllAdmins);

userRouter.route('/admins/:id')
    .all(AuthenticationMiddleware, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .get(getAdmin);

userRouter.route('/roots')
    .all(AuthenticationMiddleware, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .get(getAllRoots);

userRouter.route('/roots/:id')
    .all(AuthenticationMiddleware, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .get(getRoot);

export default userRouter
