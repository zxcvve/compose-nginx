const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const db = require('./db')

const createTableSQL = `
  CREATE TABLE IF NOT EXISTS person
  (
      id SERIAL NOT NULL PRIMARY KEY,
      name text,
      surname text
  );
`;
db.query(createTableSQL)

const app = express();
const port = 3000;
// const port = process.env.SERVER_PORT;

app.use(cors());
app.use(bodyParser.json());

// Get all people
app.get('/persons', (req, res) => {
  db.manyOrNone("SELECT * FROM person")
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.status(404)
    })
});

// Get a specific person by ID
app.get('/persons/:id', (req, res) => {
  const personId = parseInt(req.params.id);
  db.one(`SELECT * FROM person WHERE id = ${personId}`)
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.status(404).json({error: 'Person not found'});
    })
});

// Create a new person
app.post('/persons', (req, res) => {
  const newPerson = req.body;
  db.query(`INSERT INTO person (name, surname) VALUES ('${newPerson.name}','${newPerson.surname}')`)
    .then((data) => {
      res.status(201).json("Success");
    })
    .catch((error) => {
      res.status(500).json;
    })
});

// Delete a person by ID
app.delete('/persons/:id', (req, res) => {
  const personId = parseInt(req.params.id);
  db.query(`DELETE FROM person WHERE id = ${personId}`)
    .then((data) => {
      res.status(201).json("Query successful")
    })
    .catch(() => {
      res.status(500).json("An error occurred");
    })
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
