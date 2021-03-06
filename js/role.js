const runApp = require("../tracker");
const mysql = require("mysql");
const inquirer = require("inquirer");
const tracker = require("../tracker");

let depts = [];


function retrDepts() {
    tracker.connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        for (let i=0; i<res.length; i++) {
            depts.push(res[i].dept_name);
        }
    });
}


function role() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message:"What would you like to name this role?"
        },
        {
            name: "salary",
            type: "input",
            message:"What would you like the salary for this role set to?"
        },
        {
            name: "deptID",
            type: "list",
            message:"What department does this role belong to?",
            choices: depts
        }
    ]).then(function(data) {
        let dId  = data.deptID;
        let dSal = data.salary;
        let dTi = data.title;
        tracker.connection.query(
            "SELECT * FROM departments WHERE ?",
            {
                dept_name: dId
            }, 
        function(err, res) {
            if (err) throw err;
            deptOut = res[0].id;
            tracker.connection.query("INSERT INTO roles SET ?", 
                { 
                    title: dTi,
                    salary: dSal,
                    department_id: deptOut
                }, 
            function(err, res) {
                if (err) throw err;
                console.log(`\nYou've added the following role: ${data.title} \n ------------------------------- \n`);
            tracker.runApp();
            });
        });
    });
}

exports.retrDepts = retrDepts;
exports.role = role;