import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import clientRoutes from './routes/client.routes';
import adminRoutes from './routes/admin.routes';
import conn from './config/config';

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

conn.connect();
app.use('/api', authRoutes);
app.use('/api', clientRoutes);
app.use('/api', adminRoutes);

app.get('/', (req, res) => {
    res.json({
        status:200,
        message: "Welcome to Fantasic Car Wash API"
    });
});

app.get('/api/download', (req, res) => {
    const apkFile = __dirname + '/files/car-wash.apk';
    res.download(apkFile, 'car-wash.apk');
})


app.use((req, res) => {
    res
        .type('json')
        .status(404)
        .json({
            status: 404,
            errorMessage: "404 Not Found!"
        });
});

app.listen(port, console.log("The app is running at localhost with the port:" + port));
export default app;
