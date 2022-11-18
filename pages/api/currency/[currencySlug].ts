import dbConnect from "../../../utils/dbConnect";
import {
  getCurrency,
  updateCurrency,
  deleteCurrency,
} from "../../../utils/controllers";

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
        const currency = await getCurrency(req, res);
        return currency;
      } catch (err: any) {
        res.json({ success: false, data: err.message });
      }
      break;

    case "DELETE":
      try {
        const currency = await deleteCurrency(req, res);
        return currency;
      } catch (err: any) {
        res.status(400).json({ success: false, data: err.message });
      }
      break;

    case "PUT":
      try {
        const currency = await updateCurrency(req, res);
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
