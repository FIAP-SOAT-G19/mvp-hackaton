import Joi from 'joi'

const doctorScheduleSchema = Joi.object({
  startDate: Joi.string().isoDate().required(),
  crm: Joi.string().alphanum().required()

})

const getScheduleSchema = Joi.string().required()
const deleteScheduleSchema = Joi.string().required()

export { doctorScheduleSchema, getScheduleSchema, deleteScheduleSchema }
