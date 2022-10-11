import { Router } from "express";
import { getAllContract,addContract,updateContract,getContractById,deleteContract } from "../../controllers/contract/contract.controller";

import { validator } from "../../middlewares/validate";
import { ContractValidation } from "../../validators/contract.validator";
const router=Router()

router.route('/')
.get(getAllContract)
.post(validator(ContractValidation,'post'),addContract)
router.route('/:id')
.get(getContractById)
.put(validator(ContractValidation,'put'),updateContract)
.delete(deleteContract)
export default router;