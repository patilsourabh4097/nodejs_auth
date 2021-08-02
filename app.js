const express = require('express');
const expressLayouts = require('express-ejs-layouts');
app = express()
const mongoose = require('mongoose')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


//passport config
require('./config/passport')(passport);

//DB config
const db = require('./config/keys').mongoURI;

// connect to MONGO
mongoose.connect(db, {useNewUrlParser:true}, ()=>console.log('MongoDB connected'))



//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body-parser middleware
app.use(express.urlencoded({extended:false}));

// Express session middleware
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

//Global vars
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))


//PORT
PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server has started on port ${PORT}`))