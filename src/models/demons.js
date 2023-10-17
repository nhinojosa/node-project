import db from '../utils/db'

export const getDemons = async (skip, take) => {
  const count = await db.Demon.count()
  const Demons = await db.Demon.findMany({
    skip,
    take,
  })
  return { count, Demons }
}

export const getDemon = async (id) =>
  db.Demon.findUnique({ where: { demonId: id } })

export const addDemon = async (DemonData) =>
  db.Demon.create({ data: { ...DemonData } })

export const updateDemon = async (id, DemonData) => {
  const Demon = await getDemon(id)
  if (Demon) {
    return db.Demon.update({
      where: { demonId: id },
      data: { ...Demon, ...DemonData, updatedAt: new Date() },
    })
  }
  return null
}

export const deleteDemon = async (id) =>
  db.Demon.delete({ where: { demonId: id } })