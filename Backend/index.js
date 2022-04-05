require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

// const path = require('path')
const app = express()
// require('dotenv').config({ path: path.resolve(__dirname, './.env') });

// Setup static files path
app.use('/uploads', express.static('uploads'));
app.use('/', express.static('public'));

// Use body parser middleware to parse body of incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
app.use(cors({origin: 'http://localhost:4200'}))


// Setup CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/orders');
const categoryRoutes = require('./routes/category');
const { summary } = require('./controllers/orders');
const { adminAuth } = require('./middleware/check-auth');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/summary', adminAuth, summary);

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

app.use('/api/uploads*', (req, res, next) => {
    try {
        res.sendFile(__dirname + '/uploads' + req.params[0])
    } catch (error) {
        next();
    }
})

app.use('/*', (req, res, next) => {
    try {
        res.sendFile(__dirname + '/public/index.html')
    } catch (error) {
        next();
    }
})

// Handle Error Requests
// app.use((req, res, next) => {
//     const error = new Error();
//     error.message = 'Not Found';
//     error.status = 404;

//     next(error);
// });

// app.use((error, req, res, next) => {
//     console.log(error);

//     res.status(error.status || 500).json({
//         error
//     });
// });

app.get('/', (req,res)=> {
    console.log("home")
    res.send("hello world")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log("server is running..", PORT);
})

