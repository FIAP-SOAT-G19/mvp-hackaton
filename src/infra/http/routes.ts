import { Router } from 'express'
import { expressAdapter } from '../adapters/tools/http/express.adapter'
import { makeLoginDoctorController } from '../factories/controllers/doctor/login-doctor-controller.factory'
import { makeGetAllDoctorsController } from '../factories/controllers/doctor/get-all-doctors-controller.factory'
import { makeCreateDoctorController } from '../factories/controllers/doctor/create-doctor-controller.factory'
import { makeUpdateDoctorController } from '../factories/controllers/doctor/update-doctor-controller.factory'
import { makeDeleteDoctorController } from '../factories/controllers/doctor/delete-doctor-controller.factory'
import { makeCreateDoctorScheduleController } from '../factories/controllers/doctor-schedule/create-doctor-schedule-controller.factory'
import { makeGetDoctorScheduleController } from '../factories/controllers/doctor-schedule/get-doctor-schedule-controller.factory'
import { makeGetAllDoctorScheduleController } from '../factories/controllers/doctor-schedule/get-all-doctor-schedule-controller.factory'
import { makeUpdateDoctorScheduleController } from '../factories/controllers/doctor-schedule/update-doctor-schedule-controller.factory'
import { makeDeleteDoctorScheduleController } from '../factories/controllers/doctor-schedule/delete-doctor-schedule-controller.factory'

const router = Router()
// Doctor
router.get('/doctors', expressAdapter(makeGetAllDoctorsController()))
router.post('/doctor/auth', expressAdapter(makeLoginDoctorController()))
router.post('/doctor', expressAdapter(makeCreateDoctorController()))
router.patch('/doctor/:id', expressAdapter(makeUpdateDoctorController()))
router.delete('/doctor/:id', expressAdapter(makeDeleteDoctorController()))

// Doctor Schedule
router.get('/doctor/schedules', expressAdapter(makeGetAllDoctorScheduleController()))
router.get('/doctor/schedules/:scheduleId', expressAdapter(makeGetDoctorScheduleController()))
router.post('/doctor/schedules', expressAdapter(makeCreateDoctorScheduleController()))
router.patch('/doctor/schedules/:scheduleId', expressAdapter(makeUpdateDoctorScheduleController()))
router.delete('/doctor/schedules/:scheduleId', expressAdapter(makeDeleteDoctorScheduleController()))

export { router }
