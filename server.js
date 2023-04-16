// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

const inquirer = require('inquirer');
const mysql = require('mysql2')
// const fs = require('fs')
// const query = require('./db/query');
// const query = require('/db/query');

// Function to prompt user for input and call the appropriate query

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_tracker',
});





async function main() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ]);


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
    return connection.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
  };
  
  const addDepartment = (name) => {
    return connection.promise().query('INSERT INTO department (name) VALUES (?)', [name]);
  };
  
  const addRole = (title, department_id, salary) => {
    return connection.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
  };
  
  const updateEmployeeRole = (employee_id, role_id) => {
    return connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [role_id, employee_id]);
  };
  



  switch (action) {
    case 'View all departments':
      const departments = await viewAllDepartments();
      console.table(departments[0]);
      main()
      break;
    case 'View all roles':
      const roles = await viewAllRoles();
      console.table(roles[0]);
      main()
      break;
    case 'View all employees':
      const employees = await viewAllEmployees();
      console.table(employees[0]);
      main()
      break;
    case 'Add a department':
      const { departmentName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'Enter the department name:',
        },
      ]);
      await addDepartment(departmentName);
      console.log('Department added successfully!');
      main()
      break;
    case 'Add a role':
      const { title, salary, department_id } = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the role title:',
        },
        {
          type: 'number',
          name: 'salary',
          message: 'Enter the role salary:',
        },
        {
          type: 'number',
          name: 'department_id',
          message: 'Enter the department ID for the role:',
        },
      ]);
      await addRole(title, salary, department_id);
      console.log('Role added successfully!');
      main()
      break;
    case 'Add an employee':
      const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Enter the employee\'s first name:',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Enter the employee\'s last name:',
        },
        {
          type: 'number',
          name: 'role_id',
          message: 'Enter the role ID for the employee:',
        },
        {
          type: 'number',
          name: 'manager_id',
          message: 'Enter the manager ID for the employee (leave empty if no manager):',
        },
      ]);
      await addEmployee(first_name, last_name, role_id, manager_id || null);
      console.log('Employee added successfully!');
      main()
      break;
    case 'Update an employee role':
      const { employee_id, new_role_id } = await inquirer.prompt([
        {
          type: 'number',
          name: 'employee_id',
          message: 'Enter the employee ID to update:',
        },
        {
          type: 'number',
          name: 'new_role_id',
          message: 'Enter the new role ID for the employee:',
        },
      ]);
      await updateEmployeeRole(employee_id, new_role_id);
      console.log('Employee role updated successfully!');
      main()
      break;
    case 'Exit':
      process.exit(0);
  }

  






  // Call the main function again to keep asking for input until the user exits
  // main();
}

// Call the main function to start the application
main();

     






















// const express = require('express');
// // Import and require mysql2
// const mysql = require('mysql2');

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Connect to database
// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     // MySQL username,
//     user: 'root',
//     // TODO: Add MySQL password here
//     password: '',
//     database: 'movies_db'
//   },
//   console.log(`Connected to the movies_db database.`)
// );

// // Create a movie
// app.post('/api/new-movie', ({ body }, res) => {
//   const sql = `INSERT INTO movies (movie_name)
//     VALUES (?)`;
//   const params = [body.movie_name];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });
// });

// // Read all movies
// app.get('/api/movies', (req, res) => {
//   const sql = `SELECT id, movie_name AS title FROM movies`;
  
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//        return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // Delete a movie
// app.delete('/api/movie/:id', (req, res) => {
//   const sql = `DELETE FROM movies WHERE id = ?`;
//   const params = [req.params.id];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//       message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// });

// // Read list of all reviews and associated movie name using LEFT JOIN
// app.get('/api/movie-reviews', (req, res) => {
//   const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // BONUS: Update review name
// app.put('/api/review/:id', (req, res) => {
//   const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//   const params = [req.body.review, req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.affectedRows
//       });
//     }
//   });
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
