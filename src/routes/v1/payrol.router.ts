import { Router } from "express";
import { validator } from "../../middlewares/validate";
import { getAllPayRols,getPayrolById } from "../../controllers/payrol/payrol.controller";
const router=Router();
router.route('/').get(getAllPayRols)
router.route('/:id').get(getPayrolById)
export default router;