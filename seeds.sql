USE employees_db;

INSERT INTO departments(dept_name) VALUES ("Finance");
INSERT INTO departments(dept_name) VALUES ("Engineering");
INSERT INTO departments(dept_name) VALUES ("Legal");


INSERT INTO roles(title, salary, department_id) VALUES ("Accountant", "200000.00", 13);
INSERT INTO roles(title, salary, department_id) VALUES ("Account Manager", "50000.00", 13);
INSERT INTO roles(title, salary, department_id) VALUES ("Sales Lead", "12222.00", 11);
INSERT INTO roles(title, salary, department_id) VALUES ("Sales Person", "30000.00", 11);


SELECT title, salary, dept_name 
FROM roles INNER JOIN departments 
ON roles.department_id = departments.id;


SELECT e.first_name, e.last_name, r.title, r.salary
FROM employees e INNER JOIN roles r 
ON e.role_id = r.id;


SELECT e.first_name, e.last_name, r.title, r.salary, d.dept_name
FROM ((employees e
INNER JOIN roles r ON e.role_id = r.id)
INNER JOIN departments d ON r.department_id = d.id)
WHERE title = "Sales Lead";

SELECT * FROM employees WHERE manager_id IS NOT NULL;
ALTER TABLE employees ADD manager_name VARCHAR(150); 
ALTER TABLE employees DROP COLUMN manager_name;