import db from '../utils/db'

export const getDepartments = async() => db.department.findMany()

export const getDepartment = async(id) => 
db.department.findUnique({ where: {departmentId: id}})

export const addDepartment = async (name, companyId) => 
db.department.create({data: {name, companyId}})