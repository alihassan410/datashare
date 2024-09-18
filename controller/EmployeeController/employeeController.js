const Joi = require('joi');
const Employee = require('../../models/employee');

const employeeController = {
    async addEmployee(req, res, next) {
        const employeeSchema = Joi.object({
            name: Joi.string().required(),
            position: Joi.string().required(),
            salary: Joi.number().required(),
            hireDate: Joi.date().optional()
        });

        const { error } = employeeSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { name, position, salary, hireDate } = req.body;

        try {
            const newEmployee = new Employee({
                name,
                position,
                salary,
                hireDate
            });

            const savedEmployee = await newEmployee.save();
            return res.status(201).json({ employee: savedEmployee });
        } catch (error) {
            return next(error);
        }
    },
    async updateEmployee(req, res, next) {
        const employeeSchema = Joi.object({
            name: Joi.string().required(),
            position: Joi.string().required(),
            salary: Joi.number().required(),
            hireDate: Joi.date().optional(),
            _id: Joi.string(),
        });

        const { error } = employeeSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { name, position, salary, hireDate, _id } = req.body;

        try {
            const newEmployee = await Employee.findOneAndUpdate({ _id }, {
                name,
                position,
                salary,
                hireDate
            });
            return res.status(201).json({ newEmployee });
        } catch (error) {
            return next(error);
        }
    },
    async editEmployee(req, res, next) {
        const employeeSchema = Joi.object({
            name: Joi.string().optional(),
            position: Joi.string().optional(),
            salary: Joi.number().optional(),
            hireDate: Joi.date().optional()
        });

        const { error } = employeeSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { employeeId } = req.params;
        const updates = req.body;

        try {
            const updatedEmployee = await Employee.findByIdAndUpdate(
                employeeId,
                updates,
                { new: true }
            );

            if (!updatedEmployee) {
                return res.status(404).json({ message: 'Employee not found' });
            }

            return res.status(200).json({ employee: updatedEmployee });
        } catch (error) {
            return next(error);
        }
    },

    async deleteEmployee(req, res, next) {
        const { id } = req.params;
        try {
            const deletedEmployee = await Employee.findOneAndDelete({ _id: id });

            if (!deletedEmployee) {
                return res.status(404).json({ message: 'Employee not found' });
            }

            return res.status(200).json({ message: 'Employee deleted successfully' });
        } catch (error) {
            return next(error);
        }
    },
    async getAllEmployees(req, res, next) {
        try {
            const employees = await Employee.find();
            if (!employees || employees.length === 0) {
                return res.status(404).json({ message: 'No employees found' });
            }

            return res.status(200).json({ employees });
        } catch (error) {
            return next(error);
        }
    },
    async getEmployeeById(req, res, next) {
        try {
            const employees = await Employee.findById({ _id: req.params.id });
            return res.status(200).json({ employees });
        } catch (error) {
            return next(error);
        }
    }
};

module.exports = employeeController;
