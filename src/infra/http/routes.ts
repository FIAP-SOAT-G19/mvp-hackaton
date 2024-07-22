import { Router } from 'express'
import { expressAdapter } from '../adapters/tools/http/express.adapter'
import { makeLoginDoctorController } from '../factories/controllers/doctor/login-doctor-controller.factory'
import { makeGetAllDoctorsController } from '../factories/controllers/doctor/get-all-doctors-controller.factory'
import { makeCreateDoctorController } from '../factories/controllers/doctor/create-doctor-controller.factory'
import { makeUpdateDoctorController } from '../factories/controllers/doctor/update-doctor-controller.factory'
import { makeDeleteDoctorController } from '../factories/controllers/doctor/delete-doctor-controller.factory'

const router = Router()
// Doctor
router.get('/doctors', expressAdapter(makeGetAllDoctorsController()))
router.post('/doctor/auth', expressAdapter(makeLoginDoctorController()))
router.post('/doctor', expressAdapter(makeCreateDoctorController()))
router.patch('/doctor/:id', expressAdapter(makeUpdateDoctorController()))
router.delete('/doctor/:id', expressAdapter(makeDeleteDoctorController()))

export { router }
