import { Router } from "express";
import { createAdmin, createEmployee, createRoot, createSuperAdmin } from "../../controllers/user/createUser";
import { deleteAdmin, deleteEmployee, deleteRoot, deleteSuperAdmin } from "../../controllers/user/deleteUser";
import { getAllAdmins, getAllEmployees, getAllRoots, getAllSuperAdmins } from "../../controllers/user/getAllUsers";
import { getAdmin, getEmployee, getRoot } from "../../controllers/user/getUserById";
import { updateAdmin, updateEmployee, updateRoot, updateSuperAdmin } from "../../controllers/user/updateUser";
import { checkRole } from "../../middlewares/acsses";
import { AuthenticationMiddleware } from "../../middlewares/auth";
import { checkCreationPrivilage, checkUpdatePrivilage } from "../../middlewares/checkPrivilages";
import { validator } from "../../middlewares/validate";
import { Roles } from "../../types/enums";
import validateUser from "../../validators/userValidator";
const userRouter = Router();

userRouter.route('/employees')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getAllEmployees)
    .post(checkRole(Roles.ROOT, Roles.ADMIN), validator(validateUser, "post"), checkCreationPrivilage, createEmployee);
    
userRouter.route('/employees/:id')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getEmployee)
    .patch(checkRole(Roles.ROOT, Roles.ADMIN), validator(validateUser, "put"), checkUpdatePrivilage, updateEmployee)
    .delete(checkRole(Roles.ROOT, Roles.ADMIN), checkUpdatePrivilage, deleteEmployee);

userRouter.route('/superadmins')
    .all(AuthenticationMiddleware, checkRole(Roles.SUPER_ADMIN))
    .get(getAllSuperAdmins)
    .post(validator(validateUser, "post"), createSuperAdmin);

userRouter.route('/superadmins/:id')
    .all(AuthenticationMiddleware, checkRole(Roles.SUPER_ADMIN))
    .get(getEmployee)
    .patch(validator(validateUser, "put"), checkUpdatePrivilage,updateSuperAdmin)
    .delete(checkUpdatePrivilage, deleteSuperAdmin);

userRouter.route('/admins')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getAllAdmins)
    .post(checkRole(Roles.ADMIN, Roles.ROOT), validator(validateUser, "post"), checkCreationPrivilage, createAdmin);

userRouter.route('/admins/:id')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getAdmin)
    .patch(checkRole(Roles.ADMIN, Roles.ROOT), validator(validateUser, "put"), checkUpdatePrivilage, updateAdmin)
    .delete(checkRole(Roles.ADMIN, Roles.ROOT), checkUpdatePrivilage, deleteAdmin);

userRouter.route('/roots')
    .all(AuthenticationMiddleware, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .get(getAllRoots)
    .post(checkRole(Roles.ADMIN, Roles.ROOT), validator(validateUser, "post"), createRoot);

userRouter.route('/roots/:id')
    .all(AuthenticationMiddleware)
    .get(getRoot, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .patch(checkRole(Roles.SUPER_ADMIN), validator(validateUser, "put"), checkUpdatePrivilage, updateRoot)
    .delete(checkRole(Roles.SUPER_ADMIN), checkUpdatePrivilage, deleteRoot);