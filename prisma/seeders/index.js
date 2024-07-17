const { PrismaClient } = require('@prisma/client')
const doctorsGenerate = require('./doctors')
const crypto = require('crypto')

const prismaClient = new PrismaClient()

const createSeedHistory = async (seedName) => {
  await prismaClient.seedersHistory.create({
    data: {
      id: crypto.randomUUID(),
      name: seedName,
      executedAt: new Date()
    }
  })
}

const seedGenerate = async (seedName, dataGeneratorFunction, createSeederFunction) => {
  const seed = await prismaClient.seedersHistory.findFirst({ where: { name: seedName } })
  if (!seed) {
    const seedData = dataGeneratorFunction(10)

    if (seedData) {
      seedData.map(async (data) => await createSeederFunction(data))
      await createSeedHistory(seedName)
    }
  }
}

const main = async () => {
  await seedGenerate('doctors', doctorsGenerate, data => prismaClient.doctor.create({ data }))
}

main()
