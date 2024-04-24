import axios from "axios";
import Crypto from "../models/cryptoModel.js";

const fetchTenResult = async (req, res, next) => {
    try {
        // Fetch data from WazirX API
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers = response.data;

        const top10Tickers = Object.values(tickers).slice(0, 10).map((ticker) => ({
            name: ticker.name,
            last: parseFloat(ticker.last),
            buy: parseFloat(ticker.buy),
            sell: parseFloat(ticker.sell),
            volume: parseFloat(ticker.volume),
            base_unit: ticker.base_unit
        }));

        await Crypto.deleteMany({});
        await Crypto.insertMany(top10Tickers);

        res.status(200).send({ top10Tickers });
    } catch (error) {
        console.error('Error fetching and storing data:', error);
        res.status(500).send('Error fetching and storing data.');
    }
}

const getStoreData = async (req, res) => {
    try {
        const storedData = await Crypto.find({});

        res.render('index', { cryptos: storedData });
    } catch (error) {
        console.error('Error fetching stored data:', error);
        res.status(500).send('Error fetching stored data.');
    }
}

export default {
    fetchTenResult,
    getStoreData
}