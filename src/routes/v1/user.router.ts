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
    .all(checkRole(Roles.ROOT, Roles.ADMIN), checkUpdatePrivilage)
    .patch(validator(validateUser, "put"), updateEmployee)
    .delete(deleteEmployee);

userRouter.route('/superadmins')
    .all(AuthenticationMiddleware, checkRole(Roles.SUPER_ADMIN))
    .get(getAllSuperAdmins)
    .post(validator(validateUser, "post"), createSuperAdmin);

userRouter.route('/superadmins/:id')
    .all(AuthenticationMiddleware, checkRole(Roles.SUPER_ADMIN))
    .get(getEmployee)
    .all(checkUpdatePrivilage)
    .patch(validator(validateUser, "put"), updateSuperAdmin)
    .delete(deleteSuperAdmin);

userRouter.route('/admins')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getAllAdmins)
    .post(checkRole(Roles.ADMIN, Roles.ROOT), validator(validateUser, "post"), checkCreationPrivilage, createAdmin);

userRouter.route('/admins/:id')
    .all(AuthenticationMiddleware)
    .get(checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE), getAdmin)
    .all(checkRole(Roles.ADMIN, Roles.ROOT), checkUpdatePrivilage)
    .patch(validator(validateUser, "put"), updateAdmin)
    .delete(deleteAdmin);

userRouter.route('/roots')
    .all(AuthenticationMiddleware, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .get(getAllRoots)
    .post(checkRole(Roles.ADMIN, Roles.ROOT), validator(validateUser, "post"), createRoot);

userRouter.route('/roots/:id')
<<<<<<< HEAD
    .all(AuthenticationMiddleware, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .get(getRoot);

export default userRouter
=======
    .all(AuthenticationMiddleware)
    .get(getRoot, checkRole(Roles.ADMIN, Roles.ROOT, Roles.EMPLOYEE))
    .all(checkRole(Roles.SUPER_ADMIN), checkUpdatePrivilage,)
    .patch(validator(validateUser, "put"), updateRoot)
    .delete(deleteRoot);

export default userRouter;
>>>>>>> de4a296a6093b99a6508584db09e26a20b35a7a8
