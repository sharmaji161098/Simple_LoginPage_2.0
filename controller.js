const pg = require('pg');
const queries = require('./queries');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = new pg.Pool({
    user: "postgres",
    password: "mayuri",
    database: "user_database",
    host: "localhost",
    port: 5432
});

//POST ---Add employee
async function addEmp(req, res) {
    const { email, password, fName, lName, gender, date, postCode } = req.body;

    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds)

        pool.query(queries.addEmp, [email, hashPassword, fName, lName, gender, date, postCode],
            (error, results) => {
                if (error) throw error;
                res.status(201).json(results.rows[0]);
            })
        return console.log('ok')
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

//post
async function validateEmp(req, res) {
    
    //const employee = await user.findOne ({ email });

    try {
        const { email, password } = req.body;
        const result = await pool.query(queries.checkEmailExists, [email]);

        const employee = result.rows[0];
        if(!employee) {
            return res.status(400).json({ message: "Invalid email."});
        }

        const isPasswordMatch = await bcrypt.compare(password, employee.password);
        if(!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        } else {
            res.status(201).json(result.rows[0]);
        }
    }
    catch (error) {
        console.error("Server error");
        res.status(500).json({ message: "Server Error" });
    }
};

//GET
function getEmp(req, res) {
    pool.query(queries.getEmp, (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
}

function getEmpByEmail(req, res) {
    const { email, fName } = req.body;

    pool.query(queries.checkEmailExists, [email], (error, result) => {
        if (error) throw error;

        if (result.rows.email === 0) {
            res.send("Email does not exists.");
        }

        pool.query(queries.getEmpByEmail, [fName], (error, result) => {
            res.status(200).json(result.rows);
        });
    });
}

//GET
const getEmpByID = (req, res) => {
    const user_id = parseInt(req.params.user_id);
    pool.query(queries.getClientById, [user_id], (error, results) => {
        if (results.rows.length > 0) {
            res.status
        }
    });
};



//PUT
const updateEmp = (req, res) => {
    const user_id = parseInt(req.params.user_id);
    const { fName } = req.body;

    pool.query(queries.getClientById, [user_id], (error, results) => {
        const noClientFound = !results.rows.length;
        if (noClientFound) {
            res.send("Client does not exist in the database");
        }

        pool.query(queries.updateClient, [fName, user_id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Client updated successfully.");
        });
    });
};

module.exports = {
    getEmp,
    getEmpByID,
    updateEmp,
    validateEmp,
    getEmpByEmail,
    addEmp,
};