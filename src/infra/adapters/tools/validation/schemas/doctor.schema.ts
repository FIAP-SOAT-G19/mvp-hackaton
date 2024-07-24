import Joi from 'joi'

const doctorSchema = Joi.object({
  name: Joi.string().required(),
  crm: Joi.string().required(),
  password: Joi.string().required(),
  repeatPassword: Joi.ref('password')
})

export { doctorSchema }
