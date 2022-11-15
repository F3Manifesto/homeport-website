import dbConnect from "../../../utils/dbConnect";
import { addCurrency, getCurrencies } from "../../../utils/controllers";

const handler = async (req: any, res: any): Promise<void> => {
  try {
    await dbConnect();
  } catch (err: any) {
    console.error(err.message);
  }

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const currencies = await getCurrencies(req, res);
        return currencies;
      } catch (err: any) {
        res.json({ success: false, data: err.message });
      }
      break;

    case "POST":
      try {
        const currency = await addCurrency(req, res);
        return currency;
      } catch (err: any) {
        res.status(400).json({ success: false, data: err.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method}`);
      break;
  }
};

export default handler;
