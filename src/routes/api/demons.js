import { Router } from 'express'

import {
  getDemon,
  getDemons,
  addDemon,
  updateDemon,
  deleteDemon,
} from '../../models/demons'

const router = Router()

router.get('/', async (req, res) => {
  const size = Number(req.query.size) || 10
  const page = Number(req.query.page) || 1
  const skip = size * (page - 1)
  const take = size
  const { count, Demons } = await getDemons(skip, take)
  res.set({
    'X-Total-Count': count,
    'X-Total-Pages': Math.ceil(count / size),
  })
  res.send(Demons)
})

router.get('/:id', async (req, res) => {
  const Demon = await getDemon(req.params.id)
  if (Demon) {
    res.send(Demon)
  } else {
    res.status(404).send({ msg: 'Demon not found' })
  }
})

router.post('/', async (req, res) => {
  const Demon = await addDemon(req.body)
  res.send(Demon)
})

router.put('/:id', async (req, res) => {
  const Demon = await updateDemon(req.params.id, req.body)
  if (Demon) {
    res.send(Demon)
  } else {
    res.status(404).send({ msg: 'Demon not found' })
  }
})

router.delete('/:id', async (req, res) => {
  const Demon = await deleteDemon(req.params.id)
  if (Demon) {
    res.send(Demon)
  } else {
    res.status(404).send({ msg: 'Demon not found' })
  }
})

export default router