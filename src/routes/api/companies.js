import { Router } from 'express'

import { getCompanies, getCompany, addCompany } from '../../models/companies'
import { addDepartment } from '../../models/departments'

const router = Router()

router.get('/', async (req, res) => {
  const companies = await getCompanies()
  res.send(companies)
})

router.get('/:id', async (req, res) => {
  const company = await getCompany(req.params.id)
  if (company) {
    res.send(company)
  } else {
    res.status(404).send({ msg: 'Company not found' })
  }
})

router.post('/', async (req, res) => {
  const companyName = req.body.name
  if (companyName) {
    const company = await addCompany(companyName)
    res.send(company)
  } else {
    res.status(400).send({ msg: 'Company name is required' })
  }
})

router.post('/:id', async (req, res) => {
  const companyId = req.params.id
  const company = await getCompany(companyId)
  if (company) {
    const departmentName = req.body.name
    if (departmentName) {
      const department = await addDepartment(departmentName, companyId)
      res.send(department)
    } else {
      res.status(400).send({ msg: 'Department name is required' })
    }
  } else {
    res.status(400).send({ msg: 'Company does not exist required' })
  }
})

export default router