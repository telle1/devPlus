const express = require('express')

const app = express();

app.get('/', (req, res) => res.send('<h1>Hello World</h1>'))





//this will look for an env var called PORT to use when deploying;
//if no env var set, it will default to PORT 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server has connected on port ${PORT}`));
