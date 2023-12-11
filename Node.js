const express = require('express');
const app = express();
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const csvData = fs.readFileSync('car.csv', 'utf-8');
const carData = parse(csvData, { columns: true });

app.use(express.static('public'));

app.get('/api/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    const results = carData.filter(car => car.brand.toLowerCase().includes(query) || car.model.toLowerCase().includes(query));
    res.json(results);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
