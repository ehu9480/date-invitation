const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory (where your HTML, CSS, and JS files are)
app.use(express.static('public'));

// Endpoint to handle form submission
app.post('/submit-datetime', (req, res) => {
    console.log('Received datetime:', req.body.datetime);

    // Process the datetime as needed...
    // For now, just sending a confirmation message
    res.json({ message: 'Datetime received successfully!' });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});