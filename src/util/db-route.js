const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// STARTING THE APP \\
const app = express()


const SELECT_ALL_QUERY = 'SELECT * FROM users';


//CREATE AND CONFIGURE CONNECTION TO DB \\
const connection = mysql.createConnection({
	host	: 'localhost',
	port 	: '3306',
	user	: 'root',
	password: '135Howl84$$$',
	database: 'demo_schema',
	connectionlimit: 10
});

//CONNECT TO DB \\
connection.connect(err => {
	if (err) { return err; };
});

app.use(cors());

// MAKE REQUEST TO URL'S INDEX-PAGE AND POST TEXT TO WEBPAGE \\
app.get('/', (req, res) => {
	res.send('hello from the products server');
});



app.get('/users/add', (req, res) => {

	// Initializes token variable, queries URL for token and then assigns it to the variable \\
	const { user_token } = req.query;


	// Creates a variable with the SQL INSERT query assigned to its value \\
	const INSERT_TOKEN_QUERY = `INSERT INTO users (user_token) VALUES('${user_token}')`


	// Queries user table via the connection and returns err if unsuccessful \\
	connection.query(INSERT_TOKEN_QUERY, (err, results) => {
		if(err) {
			return (err);
		} else {
			return res.send('successfully added user');
		}
	});
});

app.get('/users/terms', (req, res) => {
    const { user } = req.query;
    const SELECT_USER_TERMS = `SELECT * FROM searched_terms WHERE user=${user}`;

    connection.query(SELECT_USER_TERMS, (err, results) => {
        if (err) {
            return (err);
        } else {
            return res.json({
                data: results
            })
        };
    });
});

app.get('/users/terms/add', (req, res) => {
    const { user, search_term } = req.query;
    const INSERT_SEARCH_TERM_QUERY = `INSERT INTO searched_terms (user, search_term) VALUES('${user}', '${search_term}')`;

    connection.query(INSERT_SEARCH_TERM_QUERY, (err, results) => {
        if(err) {
            return (err);
        } else {
            return res.send('Successfully added term')
        }
    });
});





app.listen(8000, () => {
	console.log('server running on 8000')
})
