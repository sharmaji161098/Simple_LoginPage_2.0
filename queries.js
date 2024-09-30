const getEmp = "SELECT * FROM client";
const getEmpByID = "SELECT * FROM client WHERE user_id = $1";
const checkEmailExists = "SELECT * FROM client WHERE email = $1";
const checkPasswordExists = "SELECT c from client c WHERE "
const updateEmp = "UPDATE client SET fName = $1 WHERE user_id = $2";
const validateEmp= "SELECT fName, lName, gender, date, postCode from client where email=$1 and password=$2";
const addEmp = "INSERT INTO client (email, password, fName, lName, gender, date, postCode) VALUES ($1, $2, $3, $4, $5, $6, $7)";

module.exports = {
    getEmp,
    getEmpByID,
    checkEmailExists,
    updateEmp,
    validateEmp,
    addEmp,
};

//if want to add employee (INSERT INTO <Table_name> Values)