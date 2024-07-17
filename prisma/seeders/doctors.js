const crypto = require('crypto')
const bcrypt = require('bcrypt')

const doctorsGenerate = (amount) => {
  const doctors = []

  for (let i = 1; i <= amount; i++) {
    doctors.push({
      id: crypto.randomUUID(),
      name: `Doctor Test ${i}`,
      crm: `doctor${i}@email.com`,
      password: bcrypt.hashSync(`doctor${i}`, 10),
      createdAt: new Date()
    })
  }

  return doctors
}
module.exports = doctorsGenerate
