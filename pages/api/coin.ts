import nextConnect from "next-connect";
import CoinGeckoApi from 'coingecko-api';
const bodyParser = require("body-parser");


const handler = nextConnect();

handler.use((req: any, res: any, next) => {
  bodyParser();
  next();
});

handler.post(async (req: any, res: any) => {
  const CoinGeckoClient = makeCoinGeckoClient();
  try {
    const price = await CoinGeckoClient.simple.price({
      ids: ['monavale'],
      vs_currencies: ['usd']
    });
    return res.json(price);
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "Error Fetching Price", success: false });
  }
});

const makeCoinGeckoClient = () => {
    return new CoinGeckoApi() 
}

export default handler;
