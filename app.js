import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import cookieParser from 'cookie-parser';
import cryptoController from "./Controllers/cryptoController.js";


const app = express();
const { fetchTenResult, getStoreData } = cryptoController;
const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

app.get('/fetchAndStoreData', fetchTenResult)
app.get('/getStoredData', getStoreData);

app.all('*', (req, res, next) => {

    res.status(404).send('404');

})

export default app;

