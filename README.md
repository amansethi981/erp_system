git clone https://github.com/amansethi981/erp_system.git
git checkout test
npm i
npm run start:dev
npm run test:cov (not covered all test case)

#env-example
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS="123321"
DB_NAME=erp_db
JWT_SECRET=myjwtsecret
JWT_EXPIRES_IN=3600s
PORT=3000   


run this command in my sql 
INSERT INTO companies (name) VALUES ('ABC Pvt Ltd')
INSERT INTO roles (id, name) VALUES (1, 'CA'), (2, 'Manager'), (3, 'Finance')

For running the project
1. You can create company admin manually
2. You can create a user with role and company
3. all payload attached in collection via email
s