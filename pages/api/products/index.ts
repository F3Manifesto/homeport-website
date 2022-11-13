import dbConnect from "../../../utils/dbConnect";
import {
  addProduct,
  getProducts,
} from "../../../utils/controller";

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
        const products = await getProducts(req, res);
        res.status(200).json({ success: true, data: products });
      } catch (err: any) {
        res.status(400).json({ success: false, data: err.message });
      }
      break;

    case "POST":
      try {
        const product = await addProduct(req, res);
        res.status(201).json({ success: true, data: product });
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
