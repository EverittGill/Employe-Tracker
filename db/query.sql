const mysql = require('msyql12');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    DATABASE: 'employee_tracker',
});


const viewAllDepartments = () => {
  return connection.promise().query('SELECT * FROM department');
};

const viewAllRoles = () => {
  return connection.promise().query('SELECT * FROM role');
};

const viewAllEmployees = () => {
  return connection.promise().query('SELECT * FROM employee');
};

const addEmployee = (first_name, last_name, role_id, manager_id) => {
  return connection.promise().query(('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);)
};

const addDepartment = (name) => {
  return connection.promise().query('INSERT INTO department (name) VALUES (?)', [name])
};

const addRole = (title, id, department_id, salary) => {
  return connection.promise().query()
};

const updateEmployee = (employee_id, role_id) => {
  return connection.promise().query()
};


