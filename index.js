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
  mainMenu();
});

const mainMenu = () => {
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
      console.log(answers.choices);
      switch (answers.choices) {
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Remove Department":
          removeDepartment();
          break;
        case "Remove Role":
          removeRole();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Exit":
          console.log("Exiting Database.");
          connection.end();
          break;
      }
    });
};

const viewAllDepartments = () => {
  let sql = `SELECT department.id AS ID, department.name AS Department FROM department`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    console.log(
      `====================================================================================`
    );
    console.log(
      `|                             All Departments:                                     |`
    );
    console.table(response);
    console.log(
      `====================================================================================`
    );
    mainMenu();
  });
};

const viewAllRoles = () => {
  let sql = `SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Department 
  FROM role INNER JOIN department ON role.department_id = department.id`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    console.log(
      `=====================================================================================`
    );
    console.log(
      `|                                    All Roles:                                     |`
    );
    console.table(response);
    console.log(
      `=====================================================================================`
    );
    mainMenu();
  });
};

const viewAllEmployees = () => {
  let sql = `SELECT employee.id, 
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
    console.log(
      `=====================================================================================`
    );
    console.log(
      `|                                    All Employee:                                  |`
    );
    console.table(response);
    console.log(
      `=====================================================================================`
    );
    mainMenu();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of department?",
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [response.department],
        function (err, data) {
          if (err) throw err;
          console.table("Successfully Added!");
          mainMenu();
        }
      );
    });
};

const addRole = () => {
  const sql = "SELECT * FROM department";
  connection.query(sql, (error, response) => {
    if (error) throw error;
    let departmentArray = [];
    response.forEach((department) => {
      departmentArray.push(department.name);
    });
    inquirer
      .prompt([
        {
          name: "departmentName",
          type: "list",
          message: "Which department does this role belong to?",
          choices: departmentArray,
        },
      ])
      .then((answer) => {
        var departmentData = answer;
        inquirer
          .prompt([
            {
              name: "newRole",
              type: "input",
              message: "What is the name of the role?",
            },
            {
              name: "salary",
              type: "number",
              message: "What is the salary of the role?",
            },
          ])
          .then((answer) => {
            let departmentId;

            response.forEach((department) => {
              if (departmentData.departmentName === department.name) {
                departmentId = department.id;
              }
            });
            let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            let crit = [answer.newRole, answer.salary, departmentId];

            connection.query(sql, crit, (error) => {
              if (error) throw error;
              console.table("Successfully Added!");
              mainMenu();
            });
          });
      });
  });
};

const addEmployee = () => {};

const updateEmployeeRole = () => {};

const removeDepartment = () => {
  let sql = `SELECT department.id, department.name FROM department`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    let departmentArray = [];
    response.forEach((department) => {
      departmentArray.push(department.name);
    });

    inquirer
      .prompt([
        {
          name: "deleteDepartment",
          type: "list",
          message: "Which department would you like to remove?",
          choices: departmentArray,
        },
      ])
      .then((answer) => {
        let departmentId;

        response.forEach((department) => {
          if (answer.deleteDepartment === department.name) {
            departmentId = department.id;
          }
        });

        let sql = `DELETE FROM department WHERE department.id = ?`;
        connection.query(sql, [departmentId], (error) => {
          if (error) throw error;
          console.log(`Department Successfully Removed`);
          mainMenu();
        });
      });
  });
};

const removeRole = () => {
  let sql = `SELECT role.id, role.title FROM role`;

  connection.query(sql, (error, response) => {
    if (error) throw error;
    let roleNamesArray = [];
    response.forEach((role) => {
      roleNamesArray.push(role.title);
    });

    inquirer
      .prompt([
        {
          name: "deleteRole",
          type: "list",
          message: "Which role would you like to remove?",
          choices: roleNamesArray,
        },
      ])
      .then((answer) => {
        let roleId;

        response.forEach((role) => {
          if (answer.deleteRole === role.title) {
            roleId = role.id;
          }
        });

        let sql = `DELETE FROM role WHERE role.id = ?`;
        connection.query(sql, [roleId], (error) => {
          if (error) throw error;
          console.log(`Role Successfully Removed`);
          mainMenu();
        });
      });
  });
};

const removeEmployee = () => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    let employeeArray = [];
    response.forEach((employee) => {
      employeeArray.push(`${employee.first_name} ${employee.last_name}`);
    });

    inquirer
      .prompt([
        {
          name: "chosenEmployee",
          type: "list",
          message: "Which employee would you like to remove?",
          choices: employeeArray,
        },
      ])
      .then((answer) => {
        let employeeId;

        response.forEach((employee) => {
          if (
            answer.chosenEmployee ===
            `${employee.first_name} ${employee.last_name}`
          ) {
            employeeId = employee.id;
          }
        });

        let sql = `DELETE FROM employee WHERE employee.id = ?`;
        connection.query(sql, [employeeId], (error) => {
          if (error) throw error;
          console.log(`Employee Successfully Removed`);
          mainMenu();
        });
      });
  });
};
