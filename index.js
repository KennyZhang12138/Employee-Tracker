const connection = require("./config/connection");
const inquirer = require("inquirer");

connection.connect((error) => {
  if (error) throw error;
  console.log(`====================================================================================`);
  console.log(`|                                                                                  |`);
  console.log(`|                                                                                  |`);
  console.log("|                                Employee Tracker                                  |");
  console.log(`|                                                                                  |`);
  console.log(`|                                                                                  |`);
  console.log("|                                                      Created By: Dunjiang Zhang  |");
  console.log(`|                                                                                  |`);
  console.log(`====================================================================================`);
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
          console.log("Exiting Database.")
          connection.end();
      }
    });
};
