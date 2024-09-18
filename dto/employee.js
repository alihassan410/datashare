class EmployeeDTO {
    constructor(employee){
        this._id = employee._id;
        this.name = employee.name;
        this.position = employee.position;
        this.salary = employee.salary;
    }
}

module.exports = EmployeeDTO;