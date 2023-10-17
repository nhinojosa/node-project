import { Router } from "express"

import {getDepartment, getDepartments} from '../../models/departments'

const router = Router()

router.get('/', async (req,res) => {
    const departments = await getDepartments()
    res.send(departments)
})


router.get('/:id', async (req,res) => {
    const department = await getDepartment( req.params.id)

    if(department) {
       res.send(department) 
    }
    else
    {
        res.status(404).send({msg: 'Department not found'})
    }
    
})

export default router
