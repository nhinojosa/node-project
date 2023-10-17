import db from '../utils/db'

export const getEmployees = async (skip, take) => {
  const count = await db.employee.count()
  const employees = await db.employee.findMany({
    skip,
    take,
  })
  return { count, employees }
}

export const getEmployee = async (id) =>
  db.employee.findUnique({ where: { employeeId: id } })

export const addEmployee = async (employeeData) =>
  db.employee.create({ data: { ...employeeData } })

export const updateEmployee = async (id, employeeData) => {
  const employee = await getEmployee(id)
  if (employee) {
    return db.employee.update({
      where: { employeeId: id },
      data: { ...employee, ...employeeData, updatedAt: new Date() },
    })
  }
  return null
}

export const deleteEmployee = async (id) =>
  db.employee.delete({ where: { employeeId: id } })