const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const DB = require('./Database/db-config');
const cookie = require('cookie-parser');

const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname,'public')));
const page_router = require('./routes/pages_routes');
const auth_router = require('./routes/auth_routes');

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.json());
app.use(cookie());

app.use('/',page_router);
app.use('/api',auth_router);

DB.connect((err)=>{
    if(err){throw err;}
    console.log('SQL Database Connected');
    app.listen(PORT, console.log(`Listening on Port ${PORT}`));
});

