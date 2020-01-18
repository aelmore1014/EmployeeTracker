const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "sammyly456",
database: "employees_db"
});

connection.connect(function(err) {
if (err) throw err;
console.log("Connected as id " + connection.threadId);
startFunction();
});

function startFunction() {
inquirer.prompt({
name: "category",
type: "list",
message: "What will you be working on today?",
choices: ["Departments", "Roles", "Employees","Exit"]}
