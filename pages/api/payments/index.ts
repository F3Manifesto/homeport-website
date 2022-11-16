import dbConnect from "../../../utils/dbConnect";
import { addPaymentAdmin, getPaymentAdmins } from "../../../utils/controllers";

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
        const paymentAdmins = await getPaymentAdmins(req, res);
        return paymentAdmins;
      } catch (err: any) {
        res.status(400).json({ success: false, data: err.message });
      }
      break;

    case "POST":
      try {
        const paymentAdmin = await addPaymentAdmin(req, res);
        return paymentAdmin;
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
