import { Router } from "express"
import basicAuth from 'express-basic-auth'


import Demons from "./demons"
const router = Router()

router.use(basicAuth({
    users: {[process.env.ADMIN_USER]: process.env.ADMIN_PASSWORD}
}),
)



router.get('/', (req, res) => {
    res.send({msg: 'Inside API enpoints'})
})


router.use('/demons', Demons)
export default router