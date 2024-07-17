import Joi from 'joi'

const doctorSchema = Joi.object({
  name: Joi.string().required(),
  crm: Joi.string().alphanum().required(),
  password: Joi.string().required(),
  repeatPassword: Joi.ref('password')
})

export { doctorSchema }
