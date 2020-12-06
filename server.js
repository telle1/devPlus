const express = require('express')
const connectDb = require('./config/db')

const app = express();
//Connect to database
connectDb();
//Init Middleware (Needed to get the data in the body request)
app.use(express.json({extended: false}));


app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

//Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

app.post('/', (req,res) => res.send('hi'))

// console.log(module)




//this will look for an env var called PORT to use when deploying;
//if no env var set, it will default to PORT 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server has connected on port ${PORT}`));
