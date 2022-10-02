import { Router } from "express";
import { createAdmin, createEmployee, createRoot, createSuperAdmin } from "../../controllers/user/createUser";
import { deleteAdmin, deleteEmployee, deleteRoot, deleteSuperAdmin } from "../../controllers/user/deleteUser";
import { getAllAdmins, getAllEmployees, getAllRoots, getAllSuperAdmins } from "../../controllers/user/getAllUsers";
import { getAdmin, getEmployee, getRoot } from "../../controllers/user/getUserById";
import { updateAdmin, updateEmployee, updateRoot, updateSuperAdmin } from "../../controllers/user/updateUser";
import { checkRole } from "../../middlewares/acsses";
import { AuthenticationMiddleware } from "../../middlewares/auth";
import { checkCreationPrivilage, checkUpdatePrivilage } from "../../middlewares/checkPrivilages";
import checkUserFound from "../../middlewares/checkUserFound";
import { validator } from "../../middlewares/validate";
import { Roles } from "../../types/enums";
import {validateUserPost, validateUserPut} from "../../validators/userValidator";
const userRouter = Router();

userRouter.route('/employees')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getAllEmployees)
    .post(checkRole(Roles.ROOT, Roles.ADMIN), checkUserFound,validator(validateUserPost,"post"), checkCreationPrivilage, createEmployee);
    
userRouter.route('/employees/:id')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getEmployee)
    .all(checkRole(Roles.ROOT, Roles.ADMIN), checkUpdatePrivilage)
    .patch(validator(validateUserPut,"put"), checkUserFound, updateEmployee)
    .delete(deleteEmployee);

userRouter.route('/superadmins')
    .all(AuthenticationMiddleware, checkRole(Roles.SUPER_ADMIN))
    .get(getAllSuperAdmins)
    .post(validator(validateUserPost,"post"), checkUserFound, createSuperAdmin);

userRouter.route('/superadmins/:id')
    .all(AuthenticationMiddleware, checkRole(Roles.SUPER_ADMIN))
    .get(getEmployee)
    .all(checkUpdatePrivilage)
    .patch(validator(validateUserPut,"put"), checkUserFound, updateSuperAdmin)
    .delete(deleteSuperAdmin);

userRouter.route('/admins')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getAllAdmins)
    .post(checkRole(Roles.ADMIN, Roles.ROOT), validator(validateUserPost,"post"), checkUserFound, checkCreationPrivilage, createAdmin);

userRouter.route('/admins/:id')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getAdmin)
    .all(checkRole(Roles.ADMIN, Roles.ROOT), checkUpdatePrivilage)
    .patch(validator(validateUserPut,"put"), checkUserFound, updateAdmin)
    .delete(deleteAdmin);

userRouter.route('/roots')
    .all(AuthenticationMiddleware)
    .get(getAllRoots)
    .post(checkRole(Roles.ADMIN, Roles.ROOT), checkUserFound, validator(validateUserPost,"post"), createRoot);

userRouter.route('/roots/:id')
    .all(AuthenticationMiddleware)
    .get(getRoot, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .all(checkRole(Roles.SUPER_ADMIN), checkUpdatePrivilage)
    .patch(validator(validateUserPut,"put"), checkUserFound, updateRoot)
    .delete(deleteRoot);

export default userRouter;
