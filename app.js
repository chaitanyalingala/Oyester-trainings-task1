const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport');

const app = express();

//Passport config
require('./config/passport')(passport);

//DB Confid
const db = require('./config/keys').MongoURI;

//Connect to MongoDB
mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true})
.then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine','ejs')

//Bodyparser
app.use(express.urlencoded({ extended:false}));


//Express Session
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 3600000 //1 hour
    }
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


//Connect Flash
app.use(flash());

//Global Vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routes 
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/todo', require('./routes/todo'))



const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`Server started on port ${PORT}`))

