const connection = require("./config/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

connection.connect((error) => {
  if (error) throw error;
  console.log(
    `====================================================================================`
  );
  console.log(
    `|                                                                                  |`
  );
  console.log(
    `|                                                                                  |`
  );
  console.log(
    "|                                Employee Tracker                                  |"
  );
  console.log(
    `|                                                                                  |`
  );
  console.log(
    `|                                                                                  |`
  );
  console.log(
    "|                                                      Created By: Dunjiang Zhang  |"
  );
  console.log(
    `|                                                                                  |`
  );
  console.log(
    `====================================================================================`
  );
  options();
});

const options = () => {
  inquirer
    .prompt([
      {
        name: "choices",
        type: "list",
        message: "What would you like to do? ",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Remove Department",
          "Remove Role",
          "Remove Employee",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;
      switch (choices) {
        case "View All Departments":
          viewAllDepartments();
        case "View All Roles":
          viewAllRoles();
        case "View All Employees":
          viewAllEmployees();
        case "Add Department":
          addDepartment();
        case "Add Role":
          addRole();
        case "Add Employee":
          addEmployee();
        case "Update Employee Role":
          updateEmployeeRole();
        case "Remove Department":
          removeDepartment();
        case "Remove Role":
          removeRole();
        case "Remove Employee":
          removeEmployee();
        case "Exit":
          console.log("Exiting Database.");
          connection.end();
      }
    });
};

const viewAllDepartments = () => {
  const sql = `SELECT department.id AS ID, department.name AS Department FROM department`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    console.log(`====================================================================================`);
    console.log(`|                             All Departments:                                     |`);
    console.table(response);
    console.log(`====================================================================================`);
    options();
  });
};

const viewAllRoles = () => {
  const sql = `SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Department 
  FROM role INNER JOIN department ON role.department_id = department.id`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    console.log(`=====================================================================================`);
    console.log(`|                                    All Roles:                                     |`);
    console.table(response);
    console.log(`=====================================================================================`);
    options();
  });
};

const viewAllEmployees = () => {
  const sql = `SELECT employee.id, 
                  employee.first_name AS FirstName, 
                  employee.last_name AS LastName, 
                  role.title AS Title, 
                  department.name AS 'Department', 
                  role.salary,
                  employee.manager_id AS Manager
                  FROM employee, role, department 
                  WHERE department.id = role.department_id 
                  AND role.id = employee.role_id`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    console.log(`=====================================================================================`);
    console.log(`|                                    All Employee:                                  |`);
    console.table(response);
    console.log(`=====================================================================================`);
    options();
  });
};

const addDepartment = () => {};

const addRole = () => {};

const addEmployee = () => {};

const updateEmployeeRole = () => {};

const removeDepartment = () => {};

const removeRole = () => {};

const removeEmployee = () => {};
