import { Router } from 'express'
import { expressAdapter } from '../adapters/tools/http/express.adapter'
/* import { makeDeleteClientController } from '../factories/controllers/doctor/delete-client-controller.factory'
import { makeGetAllClientsController } from '../factories/controllers/doctor/get-all-clients-controller.factory'
import { makeLoginClientController } from '../factories/controllers/doctor/login-client-controller.factory'
import { makeUpdateClientController } from '../factories/controllers/doctor/update-client-controller.factory' */
import { makeCreateDoctorController } from '../factories/controllers/doctor/create-doctor-controller.factory'
import { makeCreateDoctorScheduleController } from '../factories/controllers/doctor-schedule/create-doctor-schedule-controller.factory'
import { makeGetDoctorScheduleController } from '../factories/controllers/doctor-schedule/get-doctor-schedule-controller.factory'

const router = Router()
// Doctor
/* router.post('/doctor/auth', expressAdapter(makeLoginClientController())) */
router.post('/doctor', expressAdapter(makeCreateDoctorController()))
/* router.patch('/doctor/:id', expressAdapter(makeUpdateClientController()))
router.get('/doctors', expressAdapter(makeGetAllClientsController()))
router.delete('/doctor/:id', expressAdapter(makeDeleteClientController())) */

// Doctor Schedule
// router.get('/doctors/schedules', expressAdapter(makeGetAllDoctorScheduleController()))
router.get('/doctor/schedules/:scheduleId', expressAdapter(makeGetDoctorScheduleController()))
router.post('/doctor/schedules', expressAdapter(makeCreateDoctorScheduleController()))
// router.patch('/doctor/schedules/:id', expressAdapter(makeUpdateDoctorScheduleController()))
// router.delete('/doctor/schedules/:id', expressAdapter(makeDeleteDoctorScheduleController()))

export { router }
