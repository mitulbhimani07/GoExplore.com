const express = require('express');
const app = express();
const PORT = 9090;
const path = require('path');
const db = require('./config/mongoose')
const passport = require('passport');
const jwtPassport = require('./config/passport_jwt_strategy')
const session = require('express-session')
const multer = require('multer')


app.use(express.urlencoded())
// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.use(session({
    name : 'jwtSession',
    secret : "GoExplore",
    saveUninitialized: false,
    resave : false,
    cookie:{
        maxAge: 100 * 60 * 60,
    },
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use('/RentalCars',require('./routes/api/v1/RentalCarRoutes/GoExplore.RentalCarRoutes'))
app.use('/Hoels',require('./routes/api/v1/HotelsRoutes/GoExplore.HotelsRoutes'))
app.use('/Flights',require('./routes/api/v1/FlightsRoutes/GoExplore.FlightsRoutes'))
app.use('/Users',require('./routes/userRoutes'))
app.use('/Admin',require('./routes/AdminRoutes'))

app.listen(PORT,(err)=>{
    if (err) {
        console.log(err);
        return false
    }
    console.log(`Server is Started http://localhost:${PORT}`);
    
})