import { Router } from "express";
import { createAdmin, createEmployee, createSuperAdmin } from "../../controllers/user/createUser";
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
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getAllEmployees)
    .post(checkRole(Roles.ROOT, Roles.ADMIN), createEmployee);
    

userRouter.route('/employees/:id')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getEmployee);

userRouter.route('/superadmins')
    .all(AuthenticationMiddleware, checkRole(Roles.SUPER_ADMIN))
    .get(getAllSuperAdmins)
    .post(validator(validateUser, "post"), createSuperAdmin)
    .post(createSuperAdmin);


userRouter.route('/superadmins/:id')
    .all(AuthenticationMiddleware, checkRole(Roles.SUPER_ADMIN))
    .get(getEmployee);

userRouter.route('/admins')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getAllAdmins)
    .post(checkRole(Roles.ADMIN, Roles.ROOT), validator(validateUser, "post"), createAdmin);

userRouter.route('/admins/:id')
    .all(AuthenticationMiddleware, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .get(getAdmin);

userRouter.route('/roots')
    .all(AuthenticationMiddleware, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .get(getAllRoots)
    .post(checkRole(Roles.ADMIN, Roles.ROOT), validator(validateUser, "post"), createAdmin);

userRouter.route('/roots/:id')
    .all(AuthenticationMiddleware, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .get(getRoot);