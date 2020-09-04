const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const expressLayout = require('express-ejs-layouts');
const cors = require('cors');
const app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors());

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use('/uploads/',express.static('uploads'));

const db = require('./config/db').MongoURI;

mongoose.connect( 
    db, { useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5500;

app.use('/student', require('./routes/studentapi'));
app.use('/vote', require('./routes/voteapi'));
app.get('/',(req,res)=>{
    res.send('welcome');
})

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});