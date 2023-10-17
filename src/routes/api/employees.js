import { Router } from 'express'

import {
  getEmployee,
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from '../../models/employees'

const router = Router()

router.get('/', async (req, res) => {
  const size = Number(req.query.size) || 10
  const page = Number(req.query.page) || 1
  const skip = size * (page - 1)
  const take = size
  const { count, employees } = await getEmployees(skip, take)
  res.set({
    'X-Total-Count': count,
    'X-Total-Pages': Math.ceil(count / size),
  })
  res.send(employees)
})

router.get('/:id', async (req, res) => {
  const employee = await getEmployee(req.params.id)
  if (employee) {
    res.send(employee)
  } else {
    res.status(404).send({ msg: 'Employee not found' })
  }
})

router.post('/', async (req, res) => {
  const employee = await addEmployee(req.body)
  res.send(employee)
})

router.put('/:id', async (req, res) => {
  const employee = await updateEmployee(req.params.id, req.body)
  if (employee) {
    res.send(employee)
  } else {
    res.status(404).send({ msg: 'Employee not found' })
  }
})

router.delete('/:id', async (req, res) => {
  const employee = await deleteEmployee(req.params.id)
  if (employee) {
    res.send(employee)
  } else {
    res.status(404).send({ msg: 'Employee not found' })
  }
})

export default router