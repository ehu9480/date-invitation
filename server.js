const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// File to store submissions
const DATA_FILE = path.join(__dirname, 'submissions.json');

app.use(express.static('docs'));
app.use(express.json());

// Endpoint to handle form submissions
app.post('/submit-datetime', (req, res) => {
  const submission = req.body;

  // Read existing data
  fs.readFile(DATA_FILE, (err, data) => {
    if (err && err.code !== 'ENOENT') {
      res.status(500).send({ message: "Error reading file" });
      return;
    }

    const submissions = data.length ? JSON.parse(data) : [];

    // Append new submission
    submissions.push(submission);

    // Write updated data back to file
    fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2), (err) => {
      if (err) {
        res.status(500).send({ message: "Error writing file" });
        return;
      }

      res.send({ message: "Submission saved successfully" });
    });
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});