USE employee_tracker;

INSERT INTO department (name) VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');



INSERT INTO role (title, id, department_id, salary) VALUES
    ('Sales agent', 10, 1, 180000),
    ('Engineer', 20, 2, 70000),
    ('Accountant', 30, 3, 120000),
    ('lawyer', 40, 4, 130000);



INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
    (1,'Stan', 'Smith', 10, NULL), 
    (2, 'Hogan', 'Tuell', 20, 1), 
    (3, 'Jim', 'Lacy', 20, 1),
    (4,'Carson', 'Womack', 40, 4); 
