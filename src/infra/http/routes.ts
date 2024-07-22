import { Router } from 'express'
import { expressAdapter } from '../adapters/tools/http/express.adapter'
/* import { makeDeleteClientController } from '../factories/controllers/doctor/delete-client-controller.factory'
import { makeGetAllClientsController } from '../factories/controllers/doctor/get-all-clients-controller.factory'

import { makeUpdateClientController } from '../factories/controllers/doctor/update-client-controller.factory' */
import { makeLoginDoctorController } from '../factories/controllers/doctor/login-doctor-controller.factory'
import { makeCreateDoctorController } from '../factories/controllers/doctor/create-doctor-controller.factory'

const router = Router()
// Doctor
router.post('/doctor/auth', expressAdapter(makeLoginDoctorController()))
router.post('/doctor', expressAdapter(makeCreateDoctorController()))
/* router.patch('/doctor/:id', expressAdapter(makeUpdateClientController()))
router.get('/doctors', expressAdapter(makeGetAllClientsController()))
router.delete('/doctor/:id', expressAdapter(makeDeleteClientController())) */

export { router }
