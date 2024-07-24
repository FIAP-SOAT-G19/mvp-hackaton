import Joi from 'joi'

const updateDoctorSchema = Joi.object({
  name: Joi.string().required(),
  crm: Joi.string().required()
})

export { updateDoctorSchema }
