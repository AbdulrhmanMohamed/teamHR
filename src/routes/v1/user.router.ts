import { Router } from "express";
import { createAdmin, createEmployee, createRoot, createSuperAdmin } from "../../controllers/user/createUser";
import { getAllAdmins, getAllEmployees, getAllRoots, getAllSuperAdmins } from "../../controllers/user/getAllUsers";
import { getAdmin, getEmployee, getRoot } from "../../controllers/user/getUserById";
import { updateUser } from "../../controllers/user/updateUser";
import { checkRole } from "../../middlewares/acsses";
import { AuthenticationMiddleware } from "../../middlewares/auth";
import { checkUserCompany } from "../../middlewares/checkUserCompany";
import { validator } from "../../middlewares/validate";
import { Roles } from "../../types/enums";
import validateUser from "../../validators/userValidator";
const userRouter = Router();

userRouter.route('/employees')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getAllEmployees)
    .post(checkRole(Roles.ROOT, Roles.ADMIN), validator(validateUser, "post"), checkUserCompany, createEmployee);
    
userRouter.route('/employees/:id')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getEmployee)
    .put(checkRole(Roles.ROOT, Roles.ADMIN), validator(validateUser, "put"), checkUserCompany, updateUser);

userRouter.route('/superadmins')
    .all(AuthenticationMiddleware, checkRole(Roles.SUPER_ADMIN))
    .get(getAllSuperAdmins)
    .post(validator(validateUser, "post"), createSuperAdmin);

userRouter.route('/superadmins/:id')
    .all(AuthenticationMiddleware, checkRole(Roles.SUPER_ADMIN))
    .get(getEmployee)
    .put(validator(validateUser, "post"), updateUser);

userRouter.route('/admins')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getAllAdmins)
    .post(checkRole(Roles.ADMIN, Roles.ROOT), validator(validateUser, "post"), checkUserCompany, createAdmin);

userRouter.route('/admins/:id')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getAdmin)
    .put(checkRole(Roles.ADMIN, Roles.ROOT), validator(validateUser, "put"), checkUserCompany, updateUser);

userRouter.route('/roots')
    .all(AuthenticationMiddleware, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .get(getAllRoots)
    .post(checkRole(Roles.ADMIN, Roles.ROOT), validator(validateUser, "post"), createRoot);

userRouter.route('/roots/:id')
    .all(AuthenticationMiddleware)
    .get(getRoot, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .put(checkRole(Roles.SUPER_ADMIN), validator(validateUser, "put"), updateUser);