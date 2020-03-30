const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const deptJ = require("./js/dept");
const roleJ = require("./js/role");
const emplJ = require("./js/empl");


var connection = mysql.createConnection({
    host: "localhost",
    //your port if not 3306
    port: 3306,
    //your username
    user: "root",
    //your password
    password: "",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;

  
    runApp();

});

function runApp() {
    inquirer.prompt(
        {
            name: "category",
            type: "list",
            message: "What will you be working on today?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "Exit"
            ]
        }
    ).then(function(data) {
        let catQ = [];
        switch (data.category) {
            case "Departments":
                catQ = ["View departments", "Add department"];
                chooseCat(catQ);
                break;
            case "Roles":
                catQ = ["View roles", "Add role", "Exit"];
                chooseCat(catQ);
                break;
            case "Employees":
                catQ = ["View all employees", "Add employee", "Update Employee", "Exit"];
                emplJ.retrMan();
                emplJ.retrRoles();
                chooseCat(catQ);
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
}


function chooseCat(catQ) {
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: catQ
        }
    ).then(function(data) {
        switch (data.action) {
            case "View departments":
            view("departments");
            break;
    
            case "Add department": 
            deptJ.department();
            break;
    
            case "View roles":
            view("roles");
            break;
                
            case "Add role":
            roleJ.retrDepts();
            roleJ.role();
            break;
    
            case "View all employees":
            view("employees");
            break;

           case "Update Employee":
            emplJ.updateEmpl()
            break;
    
            case "Exit":
            connection.end();
            break;
        }
    });
}

//for viewing a table from the console
function view(view) {
    switch (view) {
        case "departments":
            query = "SELECT * FROM departments";
            connection.query(query, function(err,res) {
                if (err) throw err;
                console.table(res);
                runApp();
            });
            break;
        case "roles":
            query = "SELECT title, salary, dept_name FROM roles INNER JOIN departments ON roles.department_id = departments.id";
            connection.query(query, function(err,res) {
                if (err) throw err;
                console.table(res);
                runApp();
            });
            break;
        case "employees":
            query = "SELECT e.first_name, e.last_name, e.manager_name, r.title, r.salary, d.dept_name FROM ((employees e INNER JOIN roles r ON e.role_id = r.id) INNER JOIN departments d ON r.department_id = d.id)";
            connection.query(query, function(err,res) {
                if (err) throw err;
                console.table(res);
                runApp();
            });
            break;
    }
}

exports.runApp = runApp;
exports.connection = connection;
exports.view = view;