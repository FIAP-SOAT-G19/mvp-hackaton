import Joi from 'joi'

const doctorScheduleSchema = Joi.object({
  startDate: Joi.string().isoDate().required(),
  crm: Joi.string().alphanum().required()

})

export { doctorScheduleSchema }
